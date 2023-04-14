import { Member } from 'src/member/member.model';

export class WishEnt {
  id: number;
  member_id: number;

  title: string;

  location: string;

  description: string;

  benefit: string;

  contact: string;

  deliverers: Member[];

  expire: Date;
  createdAt: Date;
}
