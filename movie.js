class Order{
    constructor(Title,Year,Summary,Short_Summary,Genres,IMBD_ID,Runtime,YouTube_Trailer,Rating,Poster,Director,Writers,Cast){
     
        this.Title = Title; 
        this.Year = Year;
        this.Summary = Summary;
        this.Short_Summary = Short_Summary;
        this.Genres = Genres;
        this.IMBD_ID = IMBD_ID;
        this.Runtime = Runtime;
        this.YouTube_Trailer = YouTube_Trailer;
        this.Rating= Rating;
        this.Poster = Poster;
        this.Director = Director;
        this.Writers = Writers;
        this.Cast = Cast;
    }
}

module.exports = Order;
