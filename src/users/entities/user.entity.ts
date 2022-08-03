import { Task } from "../../tasks/entities/task.entity"
import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable } from "typeorm"

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    firstName: string

    @Column()
    lastName: string

    @Column()
    email: string

    @Column()
    password: string

    @ManyToMany(() => Task, (task) => task.assignees)
    @JoinTable()
    tasks: Task[]
}
