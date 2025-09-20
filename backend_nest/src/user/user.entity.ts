import { GroupEntity } from "@/group/group.entity";
import { Column, DeleteDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class UserEntity{
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @ManyToOne(() => GroupEntity, group => group.users,  { onDelete: 'SET NULL' })
    @JoinColumn({ name: 'group_id' })
    group: GroupEntity;

    @Column({ type: 'decimal', precision: 10, scale: 2 })
    monthlySalary: number;

    @DeleteDateColumn({ nullable: true }) // soft delete column
    deletedAt: Date | null;
}