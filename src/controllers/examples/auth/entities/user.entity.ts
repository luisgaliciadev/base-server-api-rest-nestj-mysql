import { ApiProperty } from '@nestjs/swagger';

import { IsEmail, MinLength } from 'class-validator';
import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { Product } from '../../products/entities';

@Entity('example_users')
export class User {
  @ApiProperty({
    example: '27930171-67d9-4079-8fff-04a3d62e8d3c',
    description: 'User ID',
    uniqueItems: true,
  })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({
    example: 'my_email@mail.com',
    description: 'User email',
    uniqueItems: true,
  })
  @Column('text')
  @IsEmail()
  email: string;

  @ApiProperty({
    example: 'Mypassword123',
    description: 'User password',
  })
  @Column('text', { select: false })
  @MinLength(6)
  password: string;

  @ApiProperty({
    example: 'Paul Michel',
    description: 'User full name',
  })
  @Column('text')
  @MinLength(6)
  fullName: string;

  @ApiProperty({
    default: true,
    description: 'User estatus',
  })
  @Column('bool', { default: true })
  isActive: boolean;

  @ApiProperty({
    default: ['user'],
    description: 'User role',
  })
  @Column('simple-array', {
    nullable: true,
  })
  roles: string[];

  @OneToMany(() => Product, (product) => product.user)
  product: Product;

  @BeforeInsert()
  checkFieldsNeforeInsert() {
    this.email = this.email.toLowerCase().trim();
  }

  @BeforeUpdate()
  checkFieldsNeforeUpdate() {
    this.checkFieldsNeforeInsert();
  }
}
