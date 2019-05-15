import {Asset} from './org.hyperledger.composer.system';
import {Participant} from './org.hyperledger.composer.system';
import {Transaction} from './org.hyperledger.composer.system';
import {Event} from './org.hyperledger.composer.system';
// export namespace org.uoc.reservahotel.participant{
   export abstract class uocparticipant extends Participant {
      participantKey: string;
      contact: Contact;
   }
   export class Contact {
      fname: string;
      lname: string;
      email: string;
   }
   export class uocNetworkAdmin extends uocparticipant {
   }
   export class uocPersonnel extends uocparticipant {
      department: string;
   }
   export class B2BPatner extends uocparticipant {
   }
// }
