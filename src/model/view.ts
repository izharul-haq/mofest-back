import Prisma from '@prisma/client';

export type View = Prisma.View;
// export type ViewCreateInput = Prisma.Prisma.ViewCreateInput;
// export type ViewUpdateInput = Prisma.Prisma.ViewUpdateInput;
export type ViewCreateInput = {
  userId: string;
  movieId: number;
};
