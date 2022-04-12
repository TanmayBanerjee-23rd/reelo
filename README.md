# reelo
reeloChallengeSolution

# App requirements and compatibility
1. node v12.XX.X^
2. Mongodb v4.5^

# Steps to Initiate the service:
1. Clone the repository of master branch.
2. Run "npm i"
3. Create ".env" file under "reelo" directory with the below variables and their respective values ::
    HOST_PORT=Port of your choice

    MONGODB_NAME="db_name"
    MONGODB_USER="user_name_which_has_access_to_db"
    MONGODB_PASSWORD="above user password"
4. Run "npm start"

# Endpoint details:
   1. URL: "http://localhost:4000/questions/filtered",
   2. METHOD: "GET"
   3. Query Parameters: "query parameters :: marks: int!, matchCriterion: string! < difficulty | topic | subject >, [matchCriterion]Criterions: Object { matchCriterionValue1:  string, matchCriterionValue2: string,    ... }!, groupBy: string < difficulty | topic | subject > (optional)",
   4. Description: matchCriterion is for filtering the resuts and groupBy is to derrive percentage for a second criterion on filtered results.
# Example URL's and their respective response structures:
1.  http://localhost:4000/questions/filtered?marks=100&matchCriterion=difficulty&difficultyCriterions={"easy":20,"medium":50,"hard":30}

    {
        success: true,
        data: {
            easy: {
                questions: [ {question: "", subject: "", topic: "", difficulty: "", marks: "" }, {...}, ...],
                count: number
            },
            medium: {
                questions: [ {question: "", subject: "", topic: "", difficulty: "", marks: "" }, {...}, ...],
                count: number
            },
            hard: {
                questions: [ {question: "", subject: "", topic: "", difficulty: "", marks: "" }, {...}, ...],
                count: number
            }
        },
        errorMessage: "" #always remains empty where success is equal to true
    }

2. http://localhost:4000/questions/filtered?marks=100&matchCriterion=difficulty&difficultyCriterions={"easy":20,"medium":50} 

    {
        success: true,
        data: {
            easy: {
                questions: [ {question: "", subject: "", topic: "", difficulty: "", marks: "" }, {...}, ...],
                count: number
            },
            medium: {
                questions: [ {question: "", subject: "", topic: "", difficulty: "", marks: "" }, {...}, ...],
                count: number
            }
        },
        errorMessage: "" #always remains empty where success is equal to true
    }

3. http://localhost:4000/questions/filtered?marks=100&matchCriterion=difficulty&difficultyCriterions={"easy":20,"medium":50,"hard":30}&groupBy=topic

    {
        success: true,
        data: {
            easy: {
                questions: [ {question: "", subject: "", topic: "", difficulty: "", marks: "" }, {...}, ...],
                count: number
            },
            medium: {
                questions: [ {question: "", subject: "", topic: "", difficulty: "", marks: "" }, {...}, ...],
                count: number
            },
            hard: {
                questions: [ {question: "", subject: "", topic: "", difficulty: "", marks: "" }, {...}, ...],
                count: number
            },
            groupBy: {
                "topic1": {
                    count: number,
                    percentage: number
                },
                "topic2": {
                    count: number,
                    percentage: number
                },
                ...
            }
        },
        errorMessage: "" #always remains empty where success is equal to true
    }

4. http://localhost:4000/questions/filtered?marks=100&matchCriterion=subject&subjectCriterions={"physics":20,"maths":50,"chemistry":30}&groupBy=difficulty "topic1"

    {
        success: true,
        data: {
            physics: {
                questions: [ {question: "", subject: "", topic: "", difficulty: "", marks: "" }, {...}, ...],
                count: number
            },
            chemistry: {
                questions: [ {question: "", subject: "", topic: "", difficulty: "", marks: "" }, {...}, ...],
                count: number
            },
            maths: {
                questions: [ {question: "", subject: "", topic: "", difficulty: "", marks: "" }, {...}, ...],
                count: number
            },
            groupBy: {
                "easy": {
                    count: number,
                    percentage: number
                },
                "hard": {
                    count: number,
                    percentage: number
                },
                ...
            }
        },
        errorMessage: "" #always remains empty where success is equal to true
    }

# Any Error will have a response structure as : 
    {
        success: false,
        data: {},
        errorMessage: "cause of error"
    }

# db data sample :

{question: "What is the speed of light 881", subject: "Physics", topic: "Waves", difficulty: "Hard", marks: 10},
{question: "What is the speed of light 892", subject: "Physics", topic: "Waves", difficulty: "Medium", marks: 10},
{question: "What is the speed of light 903", subject: "Physics", topic: "Waves", difficulty: "Medium", marks: 10},
{question: "What is the speed of light 914", subject: "Physics", topic: "topic 7", difficulty: "Medium", marks: 10},
{question: "What is the speed of light 925", subject: "Physics", topic: "Waves", difficulty: "Medium", marks: 10},
{question: "What is the speed of light 936", subject: "Physics", topic: "Waves", difficulty: "Medium", marks: 10},
{question: "What is the speed of light 945", subject: "Physics", topic: "topic 8", difficulty: "Medium", marks: 10},
{question: "What is the speed of light 958", subject: "Physics", topic: "Waves", difficulty: "Medium", marks: 10},
{question: "What is the speed of light 967", subject: "Physics", topic: "Waves", difficulty: "Medium", marks: 10},
{question: "What is the speed of light 979", subject: "Physics", topic: "topic 9", difficulty: "Medium", marks: 10},
{question: "What is the speed of light 981", subject: "Physics", topic: "Waves", difficulty: "Medium", marks: 10},
{question: "What is the speed of light 992", subject: "Physics", topic: "Waves", difficulty: "Medium", marks: 10},
{question: "What is the speed of light 1003", subject: "Physics", topic: "topic 7", difficulty: "Medium", marks: 10},
{question: "What is the speed of light 1014", subject: "Physics", topic: "Waves", difficulty: "Medium", marks: 10},
{question: "What is the speed of light 1025", subject: "Physics", topic: "Waves", difficulty: "Medium", marks: 10},
{question: "What is the speed of light 1036", subject: "Physics", topic: "topic 8", difficulty: "Medium", marks: 10},
{question: "What is the speed of light 1047", subject: "Physics", topic: "Waves", difficulty: "Medium", marks: 10},
{question: "What is the speed of light 1058", subject: "Physics", topic: "Waves", difficulty: "Medium", marks: 10},
{question: "What is the speed of light 1069", subject: "Physics", topic: "topic 9", difficulty: "Medium", marks: 10},
{question: "What is the speed of light 1071", subject: "Physics", topic: "Waves", difficulty: "Medium", marks: 10},
{question: "What is the speed of light 1082", subject: "Physics", topic: "Waves", difficulty: "Medium", marks: 10},
{question: "What is the speed of light 1093", subject: "Physics", topic: "topic 7", difficulty: "Medium", marks: 10},
{question: "What is the speed of light 1104", subject: "Physics", topic: "Waves", difficulty: "Medium", marks: 10},
{question: "What is the speed of light 1125", subject: "Physics", topic: "topic 8", difficulty: "Medium", marks: 10},
{question: "What is the speed of light 1136", subject: "Physics", topic: "Waves", difficulty: "Medium", marks: 10},
{question: "What is the speed of light 1144", subject: "Physics", topic: "topic 9", difficulty: "Medium", marks: 10},
{question: "What is the speed of light 1158", subject: "Physics", topic: "Waves", difficulty: "Medium", marks: 10},