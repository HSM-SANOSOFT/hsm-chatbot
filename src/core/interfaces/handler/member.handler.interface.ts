export interface MemberHandlerInterface {
  onMemberAdded(): Promise<void>;
  onMemberRemoved(): Promise<void>;
}
