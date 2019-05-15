import {Asset} from './org.hyperledger.composer.system';
import {Participant} from './org.hyperledger.composer.system';
import {Transaction} from './org.hyperledger.composer.system';
import {Event} from './org.hyperledger.composer.system';
// export namespace org.uoc.reservahotel.hotelandia{
   export class Hotelandia extends Asset {
      hotelandiaId: string;
      ownershipType: Ownership;
      habitacionIndividual: number;
      habitacionDoble: number;
      suite: number;
      nickName: string;
   }
   export enum Ownership {
      LEASED,
      OWNED,
   }
// }
