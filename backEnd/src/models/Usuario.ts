import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  OneToMany,
} from "typeorm";
import { Assinantes } from "./Assinantes";

@Entity("usuarios")
export class Usuario extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 255 })
  nome: string;


  @Column({ unique: true }) // usuario unico
  email: string;

  @Column({ select: false }) //nenhuma consulta ira retornar a senha
  senha: string;

  @Column({ nullable: true })
  status: boolean;



  @OneToMany(() => Assinantes, (assinante) => assinante.usuario)
  assinantes: Assinantes[];
}
