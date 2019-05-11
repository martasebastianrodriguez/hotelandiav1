
/**
 @param {org.uoc.reservahotel.hotel.CreateHotel} hotelData
 @transaction
*/
function createHotel(hotelData) {

    /**
     * 1. Validate the schedule data
     * If the date is a past date then throw an error
     */
    var timeNow = new Date().getTime();
    var schedTime = new Date(hotelData.scheduled).getTime();
    if(schedTime < timeNow){
        throw new Error("Scheduled time cannot be in the past!!!");
    }

    // Get the Asset Registry

    return getAssetRegistry('org.uoc.reservahotel.hotel.Hotel')
    
        .then(function(hotelRegistry){
            // Now add the Hotel - global function getFactory() called
            var  factory = getFactory();

            var  NS =  'org.uoc.reservahotel.hotel';

            
            // generate the hotel ID
           
            var  hotelId = generatehotelId(hotelData.hotelName,hotelData.scheduled);
            var  hotel = factory.newResource(NS,'Hotel',hotelId);
            hotel.hotelName = hotelData.hotelName;
        

            // Hotel asset has an instance of the concept
            // 2.2 Use the factory to create an instance of concept
            var address = factory.newConcept(NS,"Address");

            // 2.3 Set the data in the concept 'route'
            address.address = hotelData.address;
            address.city = hotelData.city;
            address.scheduled = hotelData.scheduled;

            // 2.4 Set the route attribute on the asset
            hotel.address = address;
            

            // 3 Emit the event HotelCreated
            var event = factory.newEvent(NS, 'HotelCreated');
            event.hotelId = hotelId;
            emit(event);

            // 4. Add to registry
            return hotelRegistry.add(hotel);
        });
}



function generatehotelId(hotelname, scheduled){
    var dt = new Date(scheduled)

    // Date & Month needs to be in the format 01 02 
    // so add a '0' if they are single digits
    var month = dt.getMonth()+1;
    if((month+'').length == 1)  month = '0'+month;
    var dayNum = dt.getDate();
    if((dayNum+'').length == 1)  dayNum = '0'+dayNum;

    // console.log(dayNum,month,dt.getFullYear())

    return hotelname +'-'+dayNum+'-'+month+'-'+(dt.getFullYear()+'').substring(2,4);
}

/**
 * Create Flight Transaction
 * @param {org.uoc.reservahotel.hotel.AssignHotelandia} hotelHotelandiaData
 * @transaction
 * 
 * **/
function    AssignHotelandia(hotelHotelandiaData){
    var hotelRegistry={}
    return getAssetRegistry('org.uoc.reservahotel.hotel.Hotel').then(function(registry){
        hotelRegistry = registry
        return hotelRegistry.get(hotelHotelandiaData.hotelId);
    }).then(function(hotel){
        if(!hotel) throw new Error("El Hotel : "+hotelHotelandiaData.hotelId," No Existe!!!");
        var   factory = getFactory();
        var   relationship = factory.newRelationship('org.uoc.reservahotel.hotelandia','Hotelandia',hotelHotelandiaData.hotelandiaId);
        hotel.hotelandia = relationship;
        return hotelRegistry.update(hotel);
    }).then(function(){
        // Successful update
        var event = getFactory().newEvent('org.uoc.reservahotel.hotel', 'HotelandiaAssigned');
        event.hotelId = hotelHotelandiaData.hotelId;
        event.hotelandiaId = hotelHotelandiaData.hotelandiaId;
        emit(event);
    }).catch(function(error){
        throw new Error(error);
    });

}