import { Field, ObjectType, ID } from "@nestjs/graphql";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { IUser } from "./user.interface";
import { RoleEnum } from "src/utils/eums";

@Entity('users')
@ObjectType({ implements: () => IUser })
export class UserEntity implements IUser {
    @PrimaryGeneratedColumn("uuid")
    @Field(() => ID)
    id: string;
    @Column()
    @Field()
    role: RoleEnum = RoleEnum.USER;

    @Column()
    @Field()
    firstName: string;

    @Column()
    @Field()
    lastName: string;

    @Column()
    @Field()
    get name(): string {
        return `${this.firstName} ${this.lastName}`.trim();
    }

    @Column()
    @Field()
    email: string;

    @Column()
    @Field()
    password: string;

    @Column()
    @Field()
    phone: string;

    @Column({ nullable: true })
    @Field({ nullable: true })
    isEmailVerified?: boolean;

    @Column({ nullable: true })
    @Field({ nullable: true })
    emailVerificationToken?: string;

    @Column({ nullable: true })
    @Field({ nullable: true })
    emailVerificationExpires?: Date;

    @Column({ nullable: true })
    @Field({ nullable: true })
    resetPasswordToken?: string;

    @Column({ nullable: true })
    @Field(() => Date, { nullable: true })
    resetPasswordExpires?: Date;

    @Column({ nullable: true })
    @Field(() => String, { nullable: true })
    otpCode?: string;

    @Column({ nullable: true })
    @Field(() => Date, { nullable: true })
    otpExpires?: Date;

    @Column()
    @Field(() => Date)
    createdAt: Date;

    @Column()
    @Field(() => Date)
    updatedAt: Date;
}