"use client";

import CreateServerModal from "../modals/create-server-modal";
import { DeleteServerModal } from "../modals/delete-server-modal";
import { EditServerModal } from "../modals/edit-server-modal";
import { InviteModal } from "../modals/invite-modal";
import { MembersModal } from "../modals/members-modal";

export const ModalProviders = () => {
  return (
    <>
      <CreateServerModal />
      <EditServerModal />
      <DeleteServerModal />
      <InviteModal />
      <MembersModal />
    </>
  );
};
