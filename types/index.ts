import { List, Item, Category, User } from '@prisma/client';

export type ItemFormValues = {
  name: string;
  note?: string;
  image?: string;
  category: string;
  categoryId: string;
};

export type ListFormValues = {
  title: string;
};

export type SafeUser = Omit<User, 'createdAt' | 'updatedAt' | 'emailVerified'> & {
  createdAt: string;
  updatedAt: string;
  emailVerified?: string;
};

export type StringId = {
  '$oid': string;
};

export type StringDate = {
  '$date': string;
};

export type UserItem = Item & {
  category: Category;
};

export type UserItems = Array<
  Category & {
    items: UserItem[];
  }
>;

export type SafeList = Omit<List, 'createdAt' | 'updatedAt'> & {
  createdAt: string;
  updatedAt: string;
};

export type ListItem = {
  id: StringId;
  name: string;
  amount: number;
  status: string;
};

export type ListItems = Array<{
  category: {
    title: string;
  };
  items: ListItem[];
}>;

export type ListByDate = Omit<List, 'createdAt' | 'updatedAt' | 'id' | 'userId'> & {
  _id: StringId;
  userId: StringId;
  createdAt: StringDate;
  updatedAt: StringDate;
};

export type ListsByDate = Array<{
  lists: Array<ListByDate>;
}>;

export type TopStats = Array<{
  _id: StringId & {
    name: string;
  };
  totalOccurrences: number;
}>;

export type ChartData = Array<{
  month: number | string;
  amount?: number;
  items?: number;
}>;
