import { Column, DeleteDateColumn, Entity, JoinColumn, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { UserEntity } from "@/user/user.entity";

@Entity()
export class GroupEntity{
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

   @OneToMany(() => UserEntity, user => user.group, { onDelete: 'SET NULL' })
   @JoinColumn({ name: 'group_id' })
   users: UserEntity[];

   @DeleteDateColumn({ nullable: true })
   deletedAt: Date | null;
}