import { DocumentReference } from 'angularfire2/firestore';

export interface Project {
  id: string;
  name: string;
  client: string;
  location: string;
  active: boolean;
  collaborators: DocumentReference[];
  responsible: DocumentReference[];
  skillsUsed: DocumentReference[];
}
