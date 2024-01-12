import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { MemberRole } from "@prisma/client";
import { NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";

export async function POST(req: Request) {
  try {
    const { name } = await req.json();
    const profile = await currentProfile();
    if (!profile) throw new NextResponse("Unauthorized", { status: 500 });

    const server = await db.server.create({
      data: {
        profileId: profile.id,
        name,
        imageUrl : profile.imageUrl,
        inviteCode: uuidv4(),
        channels: {
          create: [
            {
              name: "general",
              profileId: profile.id,
            },
          ],
        },
        members: {
          create: [
            {
              profileId: profile.id,
              role: MemberRole.ADMIN,
            },
          ],
        },
      },
    });

    return NextResponse.json(server)
  } catch (error) {
    console.log("[Server_Post]", error);
    return new NextResponse("Internal server error", { status: 500 });
  }
}
