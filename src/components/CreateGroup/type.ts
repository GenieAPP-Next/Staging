import dayjs from "dayjs";

export interface NameFieldProps {
  name: string;
  onNameChange: (name: string) => void;
}

export interface CategoryDropdownProps {
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
}

export interface DateFieldProps {
  selectedDate: dayjs.Dayjs | null;
  onDateChange: (date: dayjs.Dayjs | null) => void;
}

export interface Member {
  id: string;
  name: string;
}

export interface MemberListProps {
  members: Member[];
  selectedBillPayerId: string | null;
  onSelectBillPayer: (id: string) => void;
}

export interface AddMemberProps {
  onAddMember: () => void;
}

export interface GroupCardProps {
  groupName: string;
  category: string;
  memberCount: number;
  eventDate: string;
  avatarColor: string;
}
