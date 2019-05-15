import {Asset} from './org.hyperledger.composer.system';
import {Participant} from './org.hyperledger.composer.system';
import {Transaction} from './org.hyperledger.composer.system';
import {Event} from './org.hyperledger.composer.system';
// export namespace org.uoc.reservahotel.hotel{
   export class Hotel extends Asset {
      hotelId: string;
      hotelName: string;
      address: Address;
   }
   export class Address {
      address: string;
      city: string;
      scheduled: Date;
   }
   export class CreateHotel extends Transaction {
      hotelName: string;
      address: string;
      city: string;
      scheduled: Date;
   }
   export class HotelCreated extends Event {
      hotelId: string;
   }
   export class AssignHotelandia extends Transaction {
      hotelId: string;
      hotelandiaId: string;
   }
   export class HotelandiaAssigned extends Event {
      hotelId: string;
      hotelandiaId: string;
   }
// }
