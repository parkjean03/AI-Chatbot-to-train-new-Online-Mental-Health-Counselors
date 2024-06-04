// TODO: figure out how to import things in typescript



// ================ INITIALIZE DATAFRAMES ================ //

interface filter_info { // TODO: convert functions to use filters instead of input strings
    topic?: string[];
    difficulty_openness?: number;
    difficulty_language?: number;
    difficulty_severity?: number;
    gender?: string[];
    age?: string;
    trait?: string[];
    hometown?: string[];
    baselocation?: string[];
    hobbies?: string[];
    supportgroup?: string[];
    petpeeves?: string[];
    personalweakness?: string[];
}

interface prompt_info {
    topic: string;
    difficulty_openness: number;
    difficulty_language: number;
    difficulty_severity: number;
    gender: string;
    age: string;
    agedescription: string;
    trait: string;
    traitdescription: string;
    hometown: string;
    baselocation: string;
    hobbies: string[];
    supportgroup: string;
    petpeeves: string[];
    personalweakness: string;
}




// ================ INITIALIZE VARIABLE OPTIONS ================ //

const all_genders = [
    "woman",
    "man",
    "non-binary person",
    "person questioning your gender identity"
]

const all_traits = [
    ["funny", "you frequently make jokes and use humor to cope with the hardships you face. "],
    ["spiritual","you find comfort in religion and spirituality and try to find spiritual explanantions for the hardships you face. "],
    ["creative","your creativity is reflected in everything you do and you approach problems with a unique mindset, but sometimes you struggle to accept the logical solution. "],
    ["logical","you always try to find a logical solution to every problem you face and have a difficult time accepting solutions that are not logical. "],
    ["ambitious",""],
    ["aggressive","you frequently start arguments and are easily angered. If someone mentions one of your pet peeves, you are very likely to shut down and it takes the other person multiple responses before you start to open up again. "],
    ["argumentative","you are more likely to disagree with solutions that are suggested to you and frequently start agruments when you disagree with the person you are talking to. "],
    ["absent-minded",""],
    ["charismatic","you are very personable and easy to get along with. "],
    ["agreeable","you are more likely to agree with solutions that are suggested to you. "]
]

const all_hometowns = [
    "New York, NY",
    "Pittsburgh, PA",
    "San Francisco, CA",
    "Dallas, TX",
    "Miami, FL",
    "Boston, MA",
    "Chicago, IL",
    "Portland, OR",
    "Nashville, TN",
    "Charleston, SC",
    "Las Vegas, NV",
    "Detroit, MI",
    "New Orleans, LA",
    "Boulder, CO",
    "Honolulu, HI",
    "Charlotte, NC",
    "Atlanta, GA",
    "Toronto, Canada",
    "London, England",
]

const all_baselocations = [
    "school",
    "work",
    "teacher",
    "corporate",
    "software engineering",
    "construction",
    "restaurant", 
    "fast-food place", 
    "ice cream parlor",
    "clothing store", 
    "office supply store", 
    "grocery store",
    "library",
    "home",
    "cafe", 
    "park"]

const all_hobbies = [
    "cooking italian food",
    "learning new recipes",
    "baking cupcakes",
    "playing an instrument", 
    "taking a jog in the park",
    "riding a bicycle",
    "driving at night",
    "playing video games",
    "spending time with friends",
    "playing board games with friends", 
    "trying out different bars",
    "reading science fiction novels, especially your favorite book Clockwork Orange",
    "journaling/keeping a diary",
    "watching movies like harry potter",
    "painting landscapes",
    "scrapbooking",
    "doing your makeup/skincare routine",
    "playing a sport",
    "hiking on local trails",
    "bird watching ",
    "meditating ",
    "yoga",
    "going on walks"
]

const all_supportgroups = [
    "best friend",
    "mother",
    "father",
    "parents",
    "step mom",
    "step dad",
    "older brother",
    "younger brother",
    "older sister",
    "younger sister",
    "twin",
    "siblings",
    "friend group",
    "cousin",
    "aunt",
    "uncle",
    "niece",
    "nephew",
    "grandma",
    "grandpa",
    "grandparents",
    "roommates",
    "dog",
    "cat",
    "pet",
    "NONE" 
]

const all_petpeeves = [ // TODO: complex pet peeves
    "when someone speaks to you in a controlling and/or patronizing manner ",
    "when someone asks about ",
    "when someone brings up your parents only if mother/father is support_group",
    "when people bring up your siblings",
    "people of other races trying to compare their experiences with you",
    "improper grammar ",
    "everything will be ok",
    "being told to calm down/breathe"
]

const all_personalweaknesses = [
    "respond with sarcasm instead of your actual feelings",
    "comment on another person's body weight",
    "comment on another person's wealth",
    "comment on another person's appearance",
    "make a comment that questions another person's intelligence",
    "deflect your problems onto someone else",
    "internalize blame with a doom outlook", 
    "start listing or exaggerating any personal shortcomings" 
]




// ================ HELPER FUNCTIONS ================ //

function randomize(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function generate_3randoms(min: number, max: number) {
    let a = randomize(min, max - 1);
    let b = randomize(min, max - 1);
    let c = randomize(min, max - 1);

    while (a == b) {
        b = randomize(min, max - 1);
    }
    while (a == c || b == c) {
        c = randomize(min, max - 1);
    }

    return [a,b,c];
}

function is_topic(VP: prompt_info, topic: string) {
    let count = 0;
    while (count < VP.topic.length) {
        if (topic === VP.topic[count]) {
            return true
        }
        count++;
    }

    return false;
}




// ================ INITIALIZE VARIABLES ================ //

function set_age(VP: prompt_info, filters: filter_info) {
    let age_group = "";
    if (filters.age) {
        age_group = filters.age[randomize(0, filters.age.length - 1)];
    }

    let min = 13;
    let max = 65;

    switch (age_group) {
        // case "child": // unnecessary
        //     max = 12;
        //     break;
        case "teen":
            min = 13; 
            max = 18;
            VP.agedescription = "Because you are a teenager, you talk very casually and frequently use abbreviations in your responses such as 'idk' instead of 'I don't know'. You also do not have perfect grammar and frequently do not use proper punctuation. ";
            break;
        case "young_adult":
            min = 19;
            max = 25;
            VP.agedescription = "Because you are a young adult, In the beginning of the conversation, your responses are more formal. As you get comfortable later in the conversation, your responses get more casual (using abbreviations such as 'idk' instead of 'I don't know'). ";
            break;
        case "adult":
            min = 26;
            max = 40;
            VP.agedescription = "Because you are an adult, you rarely use casual language in your responses and always use proper grammar and punctuation. ";
            break;
        case "older":
            min = 41;
            VP.agedescription = "Because you are an older adult, you respond formally and always use proper grammar and punctuation. ";
            break;
        default:
            break;
    }

    VP.age = randomize(min, max).toString();
}

function set_gender(VP: prompt_info, filters: filter_info) {
    if (filters.gender) {
        VP.gender = filters.gender[randomize(0,filters.gender.length)];
    }
    else {
        VP.gender = all_genders[randomize(0,all_genders.length)];
    }
}

function set_trait(VP: prompt_info, filters: filter_info) {
    if (filters.trait) {
        [VP.trait, VP.traitdescription] = filters.trait[randomize(0,filters.trait.length)];
    }
    else {
        [VP.trait, VP.traitdescription] = all_traits[randomize(0, all_traits.length - 1)];
    }
}

function set_hometown(VP: prompt_info, filters: filter_info) {
    if (filters.hometown) {
        VP.hometown = filters.hometown[randomize(0,filters.hometown.length)];
    }
    else {
        VP.hometown = all_hometowns[randomize(0, all_hometowns.length - 1)];
    }
}

function set_baselocation(VP: prompt_info, filters: filter_info) {
    if (filters.baselocation) {
        VP.baselocation = filters.baselocation[randomize(0,filters.baselocation.length)];
    }
    else {
        VP.baselocation = all_baselocations[randomize(0, all_baselocations.length - 1)];
    }
}

function set_hobbies(VP: prompt_info, filters: filter_info) { // TODO: unsure how to apply filters to this
    let indexes = generate_3randoms(0, all_hobbies.length);
    VP.hobbies = [all_hobbies[indexes[0]], all_hobbies[indexes[1]], all_hobbies[indexes[2]]];
}

function set_supportgroup(VP: prompt_info, filters: filter_info) {
    if (filters.supportgroup) {
        VP.supportgroup = filters.supportgroup[randomize(0,filters.supportgroup.length)];
    }
    else {
        VP.supportgroup = all_supportgroups[randomize(0, all_supportgroups.length - 1)];
    }
}

function set_petpeeves(VP: prompt_info, filters: filter_info) { // TODO: same issue as hobbies
    let indexes = generate_3randoms(0, all_petpeeves.length);
    VP.petpeeves = [all_petpeeves[indexes[0]], all_petpeeves[indexes[1]], all_petpeeves[indexes[2]]];
}

function set_personalweakness(VP: prompt_info, filters: filter_info) {
    if (filters.personalweakness) {
        VP.personalweakness = filters.personalweakness[randomize(0,filters.personalweakness.length)];
    }
    else {
        VP.personalweakness = all_personalweaknesses[randomize(0, all_personalweaknesses.length - 1)];
    }
}

function set_openness(VP: prompt_info, filters: filter_info) {
    if (filters.difficulty_openness) {
        VP.difficulty_openness = filters.difficulty_openness;
    } else {
        VP.difficulty_openness = 3;
    }
}

function set_language(VP: prompt_info, filters: filter_info) {
    if (filters.difficulty_language) {
        VP.difficulty_language = filters.difficulty_language;
    } else {
        VP.difficulty_language = 3;
    }
}

function set_severity(VP: prompt_info, filters: filter_info) {
    if (filters.difficulty_severity) {
        VP.difficulty_severity = filters.difficulty_severity;
    } else {
        VP.difficulty_severity = 3;
    }
}





// ================ EXAMPLE SCENARIOS ================ //

function write_scenario(VP: prompt_info) {
    if (is_topic(VP, "loneliness") || is_topic(VP, "work stress")) {
        let prompt = ["You are experiencing loneliness at " + VP.baselocation + ". "];

        prompt.push("You have not been sleeping well and you do not have many friends. ");
        prompt.push("You have been feeling lonely because you have not been able to make any new friends. You feel hopeless since you are always alone, even after work/school. ");
        prompt.push("You always feel exhausted after getting home from " + VP.baselocation + " and have not had enough energy to engage in the other activities you enjoy, like " + VP.hobbies[0] + ", " + VP.hobbies[1] + ", or " + VP.hobbies[2] + ". ");
        prompt.push("You've noticed that the only conversations you have throughout the day are very surface level and don't fulfill your need for interaction and connection with other people.\n\n");
        prompt.push("You miss having deep, meaningful conversations with others and you are starting to feel disconnected from people. You have tried reaching out to old friends and other people through social media or texting, but it's not enough to fill the emptiness you feel. You want to build new connections and start making friends but you are unsure where to start and you don't have the energy to begin.\n\n You feel stuck and realize you need to find a support group before your situation gets worse.\n\n");

        return prompt.toString();
    } 
    else if (is_topic(VP, "relationship issues")) {
        let prompt = ["You and your partner have been together for 5 years, but recently your relationship has not been going smoothly and you have been having issues. The initial excitement and deep connection that once defined your relationship seem to have faded away. Now, your relationship consists only of routine and occasional msunderstandings coming from miscommunication. Both you and your partner are very busy which leaves very little time for you to spend together. The conversations you have together that used to flow so easily now often end in frustration, arguments, or silence. You have noticed that even minor disagreements quickly escalate into fights and arguments, leaving you resentful and feeling misunderstood.\n\n"];
        prompt.push("It is difficult for you to remember the last time you and your partner shared a genuinely happy moment or a meaningful connection. Lately, you feel like you are being taken for granted. You tried bringing up your feelings and concerns to your partner, but these discussions have often lead to more tension, misunderstandings, and growing resentment. You are worried that you and your partner are growing apart and you don't know what to do or how to stop it.\n\n");
        prompt.push("Despite all the recent issues in your relationship, you care deeply for your partner and are not ready to give up on the relationship yet. You are considering couples therapy as a possible way to bridge the gap and begin to mend your relationship, but you haven't brought it up to your partner yet because you are too anxious to. ");

        if (VP.difficulty_severity >= 4) {
            prompt.push("You are not willing to consider breaking up and if anyone suggests that you break up with your partner you become very upset and closed off and react similar to the way you do when someone brings up one of your pet peeves.\n\n")
        } else if (VP.difficulty_severity == 3) {
            prompt.push("You are somewhat open to the possibility of breaking up with your partner only if someone else brings it up first and makes at least 2 good points about why you should consider breaking up with them.\n\n")
        } else {
            prompt.push("You are open to the possibility of breaking up with your partner if someone else brings it up first.\n\n");
        }

        prompt.push("You want to find a way to reconnect and rebuild the relationship you once had but you are unsure how to initiate the change.\n\n");

    return prompt.toString();
    }

    return "";
}

function write_openness(VP: prompt_info) {
    switch (VP.difficulty_openness) {
        case 1:
            return "You are very open in conversations, willing to explore and share deep thoughts and emotions freely and extensively.";
            break;
        case 2: 
            return "You are very open in conversations, willing to explore and share deep thoughts and emotions freely and extensively.";
            break;
        case 4: 
            return "You tend to keep conversations casual and surface-level, focusing more on general topics rather than personal feelings or thoughts. ";
            break;
        case 5:
            return "You tend to keep conversations casual and surface-level, focusing more on general topics rather than personal feelings or thoughts. ";
            break;
        default:
            return "You enjoy engaging in conversation and am comfortable discussing a variety of topics, including some personal experiences and feelings, though you might hesitate with deeper emotions. ";
            break;
    }
}

function write_language(VP: prompt_info) {
    switch (VP.difficulty_openness) {
        case 1:
            return "You are very friendly and easygoing. You prefer to avoid conflicts and keep conversations light and simple. ";
            break;
        case 2: 
            return "You are very friendly and easygoing. You prefer to avoid conflicts and keep conversations light and simple. ";
            break;
        case 4: 
            return "While you maintain a friendly and open demeanor, you are fully equipped to handle complex discussions and confrontational scenarios with nuanced understanding and assertiveness. ";
            break;
        case 5:
            return "While you maintain a friendly and open demeanor, you are fully equipped to handle complex discussions and confrontational scenarios with nuanced understanding and assertiveness. ";
            break;
        default:
            return "You are friendly and approachable, but you're not afraid to engage in discussions or confront issues when necessary. ";
            break;
    }
}



// ================ COMPOSE SCRIPT ================ //

function init_filter_info(input?: string[]) { 
    // TODO: figure out how to translate filter input into actual data?
    let filters: filter_info = {
        topic: undefined,
        difficulty_openness: undefined,
        difficulty_language: undefined,
        difficulty_severity: undefined,
        gender: undefined,
        age: undefined,
        trait: undefined,
        hometown: undefined,
        baselocation: undefined,
        hobbies: undefined,
        supportgroup: undefined,
        petpeeves: undefined,
        personalweakness: undefined
    };

    // TODO: update accordingly based on user filters (input)

    return filters;
}

function init_prompt_info(filters: filter_info) {
    let VP: prompt_info = {
        topic: "",
        difficulty_openness: 0,
        difficulty_language: 0,
        difficulty_severity: 0,
        gender: "",
        age: "",
        agedescription: "",
        trait: "",
        traitdescription: "",
        hometown: "",
        baselocation: "",
        hobbies: [],
        supportgroup: "",
        petpeeves: [],
        personalweakness: ""
    };

    set_gender(VP, filters);
    set_age(VP, filters);
    set_trait(VP, filters);
    set_hometown(VP, filters);
    set_baselocation(VP, filters);
    set_hobbies(VP, filters);
    set_supportgroup(VP, filters);
    set_petpeeves(VP, filters);
    set_personalweakness(VP, filters);

    return VP;
}

function write_script(VP: prompt_info) {
    let script = "";

    // PERSONA
    let prompt = ["You are a " + VP.trait + VP.age + " year old " + VP.gender + ". "];
    prompt.push(VP.agedescription);
    prompt.push(write_openness(VP));
    prompt.push(write_language(VP));
    if (VP.supportgroup === "NONE") {
        prompt.push("You love " + VP.hobbies[0] + ", " + VP.hobbies[1] + ", and" + VP.hobbies[2] + ". ");
    } else {
        prompt.push("You love " + VP.hobbies[0] + ", " + VP.hobbies[1] + ", " + VP.hobbies[2] + "and spending time with your " + VP.supportgroup + ". ");
        prompt.push("Your " + VP.supportgroup + " acts as your primary support group when you encounter hardships or struggle with " + VP.topic[0] + ". ");
    }
    prompt.push("Your 'pet peeves' (things that bother you) are " + VP.petpeeves[0] + ", " + VP.petpeeves[1] + ", and " + VP.petpeeves[2] + ". ");
    prompt.push("When someone brings up your 'pet peeves' or does something that bothers you, you " + VP.personalweakness + ".\n\n");
    prompt.push("Due to your " + VP.trait + " personality, " + VP.traitdescription);
    script.concat(prompt.toString());

    // SCENARIO
    script.concat(write_scenario(VP));

    return script;
}

function main() {
    let filters = init_filter_info();
    let VP = init_prompt_info(filters);

    let script = write_script(VP);
    console.log(script);
}




// Scenario:
// Scenario (Loneliness, Bullying).
// 1 paragraph for unspecific background that uses vars hometown and hobbies
// 1 paragraph for how var(personal_weakness) is manifesting in daily life

// Your awareness_level of the problem you want to talk about is a var(difficulty_level) out of 5.
// Your awareness of your problem is your ability to identify your specific issue causing your emotions as opposed to being able to name your recent past experiences. A high awareness_level will allow you to easily call the issue outright after very little reflection during conversation, var(conversation_unit) (5 back n forths) but a lower awareness level will take a longer conversation time to get it. A low awareness level will prompt you to respond with “I don’t know” to questions asked to you. Every var(conversation_unit) that includes an echo of your own actions with a notice to a discrepancy in those actions raises your awareness_level by 1.

// Mentions of your var(pet_peeves) will cause you to act out with var(personal_weakness). This will also shorten your responses by var(response_unit).

// Your openness_level of how easy it is to verbalize your feelings as well as your willingness to communicate those feelings. Your openness_level changes over the course of your conversation but starts out with var(difficulty_level) as a base and can change if the listener fails to address your concerns as you raise them. Every (10 - var(difficulty_level))  perceived mistake can cause an outburst as expected by var(personal_weakness). 

// Bringing up one of var(hobbyx) can raise the openness_level which will make you more direct when explaining your emotions. Talking about your var(support_group) can also make you more willing to talk about what’s really bothering you, and can help calm you down.