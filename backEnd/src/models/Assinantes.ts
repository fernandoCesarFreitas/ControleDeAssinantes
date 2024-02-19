import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  ManyToOne,
  JoinColumn,
} from "typeorm";

import { Usuario } from "./Usuario";

@Entity("assinantes")
export class Assinantes extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true})
  codigo: string;

  @Column( { nullable: true })
  nome: string;

  @Column({ nullable: true })
  rua: string;

  @Column({ nullable: true })
  numero: string;

  @Column({ nullable: true })
  bairro: string;

  @Column({ nullable: true })
  cidade: string;

  @Column({ nullable: true })
  tipo: string;

  @Column({ nullable: true , type: "text"})
  descricao: string;

  @Column({ nullable: true })
  coordenadas: string;

  @Column('int', { nullable: true })
  ordemEntrega: number;

  @Column({ nullable: true })
  status: boolean;
  
  @Column({})
  public usuario_id: number;
  
  @Column('text', { nullable: true })
  imagem: string;


  @ManyToOne(() => Usuario, (usuario) => usuario.assinantes, { eager: true })//define a relação com a entidade Usuario
  @JoinColumn({ name: "usuario_id" })
  public usuario: Usuario;
}
