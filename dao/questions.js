const moment = require( "moment" );
const dbHelper = require( "../core/dbHelper" );

exports.getfilteredQuestions = async ( filterCriterionObj ) => {

    const dbInstance = dbHelper.getDbInstance();

    const queryAggregatorsArr = constructQueryAggregationArr( filterCriterionObj );

    // wewWill query the database based on each matchCriterionValue simultanously
    let promiseIterator = [];

    queryAggregatorsArr.forEach( (matchCriterionValueTypeQueryAggregationArr) => {
        promiseIterator.push( dbInstance.collection("questions").aggregate( matchCriterionValueTypeQueryAggregationArr ).toArray() )
    } );

    return Promise.all( promiseIterator )
    .then( results => results );
};

const constructQueryAggregationArr = ( filterCriterionObj ) => {

    let aggregateOperationsArr = [];

    if ( filterCriterionObj.matchCriterion ) {

        const totalMarks = filterCriterionObj.marks;
        const matchCriterionValueTypeSeggregationObj = JSON.parse( filterCriterionObj[ `${ filterCriterionObj.matchCriterion }Criterions`] );
        
        Object.keys( matchCriterionValueTypeSeggregationObj ).forEach( matchCriterionValueType => {
            aggregateOperationsArr.push([
                { $match: { [filterCriterionObj.matchCriterion]: matchCriterionValueType } },
                // using $sample operator to randomly pic up documnets so as to avoid fetcing same set of question on every request.
                { $sample: { size: ( ( matchCriterionValueTypeSeggregationObj[ matchCriterionValueType ] / 100 ) * totalMarks ) } }
            ] );
        } );
    }

    return aggregateOperationsArr;
};