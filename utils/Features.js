class APIFeatures {
  // in the constructor .. we recieve  query == Room.find() o update .. etc
  // in the query string .. we recieve .. the req.query
  constructor(query, queryStr) {
    this.query = query;
    this.queryStr = queryStr;
  }
  // "i" means case insensitive .. ie,, uppercase not sensitive
  search() {
    const location = this.queryStr.location
      ? {
          address: {
            $regex: this.queryStr.location,
            $options: "i",
          },
        }
      : {};
    // console.log(location);
    this.query = this.query.find({ ...location });
    return this;
  }
  filter() {
    const queryCopy = { ...this.queryStr };
    // console.log(queryCopy);
    // remove the field params in the query
    const removedFields = ["location", "page"];
    // location is handled in the search function
    removedFields.forEach((el) => delete queryCopy[el]);
    // console.log(queryCopy);
    //helpful in setting up of customised query elements for different functions ..
    this.query = this.query.find(queryCopy);
    return this;
  }
  pagination(elpp) {
    // elpp is how much we want to show per page
    const currentPage = Number(this.queryStr.page) || 1; // get  the crnt page from the query
    const skipPrevious = elpp * (currentPage - 1); // skip the items from the previous page

    this.query = this.query.limit(elpp).skip(skipPrevious); //  this.query = Room.find.limit()
    return this;
  }
}

export default APIFeatures;
