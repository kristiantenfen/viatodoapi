import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('tasks')
class Task {

    @PrimaryGeneratedColumn('uuid')
    id: string;
        
    @Column('varchar')
    title: string;
            
    @Column('text')
    description: string;
            
    @Column('timestamp')
    created_at ?: Date;
            
    @Column('timestamp')
    updated_at ?: Date;
            
    @Column('boolean')
    status ?: Number;

}

export default Task;