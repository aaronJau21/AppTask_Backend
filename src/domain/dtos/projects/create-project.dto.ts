

export class CreateProjectDto {

  projectName: string;
  clientName: string;
  description: string;

  constructor( projectName: string, clientName: string, description: string ) {
    this.projectName = projectName;
    this.clientName = clientName;
    this.description = description;
  }

}