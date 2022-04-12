const moment = require( "moment" );
const questionDao = require( "../dao/questions" );

exports.getfilteredQuestions = async ( filterCriterionObj ) => {

    const fetchedDataFromDB = await (await questionDao.getfilteredQuestions( filterCriterionObj )).flat( 1 ); // fetching data form DB based on matchCriterion

    // response restructing based on matchCriterion and if groupBy filter is received within query paramenters
    
    return fetchedDataFromDB.reduce( ( buffObj, questionObj ) => {
        if ( buffObj.hasOwnProperty( questionObj[ filterCriterionObj.matchCriterion ] ) ) {

            buffObj[ questionObj[ filterCriterionObj.matchCriterion ] ].questions.push( questionObj );
            buffObj[ questionObj[ filterCriterionObj.matchCriterion ] ].count++;
        } else {
            buffObj[ questionObj[ filterCriterionObj.matchCriterion ] ] = { questions: [ questionObj ], count: 1 };

        }
        
        if ( filterCriterionObj.groupBy ) {

            if ( !buffObj.groupBy ) buffObj.groupBy = {};

            if ( buffObj.groupBy.hasOwnProperty( `${ questionObj[ filterCriterionObj.groupBy ]}` ) ) {

                buffObj.groupBy[ `${ questionObj[ filterCriterionObj.groupBy ]}` ].count++;
                buffObj.groupBy[ `${ questionObj[ filterCriterionObj.groupBy ]}` ].percentage = Math.round( ( ( buffObj.groupBy[ `${ questionObj[ filterCriterionObj.groupBy ]}` ].count / fetchedDataFromDB.length ) * 100 ) );
            } else {

                if ( !buffObj.groupBy[ `${ questionObj[ filterCriterionObj.groupBy ]}` ] ) buffObj.groupBy[ `${ questionObj[ filterCriterionObj.groupBy ]}` ] = { count: 0, percentage: 0 };

                buffObj.groupBy[ `${ questionObj[ filterCriterionObj.groupBy ]}` ].count = 1;
                buffObj.groupBy[ `${ questionObj[ filterCriterionObj.groupBy ]}` ].percentage = Math.round( ( ( 1 / fetchedDataFromDB.length ) * 100 ) );
            }
        }

        return buffObj;
    }, {});

};