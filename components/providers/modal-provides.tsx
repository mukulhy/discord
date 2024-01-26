"use client";
import CreateServerModal from "../modals/create-server-modal";
import { InviteModal } from "../modals/invite-modal";

export const ModalProviders = () => {
  return (
    <>
      <CreateServerModal />
      <InviteModal />
    </>
  );
};
