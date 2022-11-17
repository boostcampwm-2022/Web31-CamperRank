import { CreateDateColumn, UpdateDateColumn } from 'typeorm';

export abstract class BaseTimeEntity {
  @CreateDateColumn({ name: 'create_at', comment: '생성일' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'update_at', comment: '수정일' })
  updatedAt: Date;
}
