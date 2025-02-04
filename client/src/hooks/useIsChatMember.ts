import { useAppSelector } from './useAppSelectorAndDispatch';

export const useIsChatMember = () => {
  const currentUser = useAppSelector((state) => state.loggedInUser);
  const currentChat = useAppSelector((state) => state.currentChat);

  const isStillMember = currentChat.members.some(
    (member) => member.id === currentUser.id
  );

  return isStillMember;
}; 