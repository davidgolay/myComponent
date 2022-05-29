const getRuleSet = (nameSet = 'default') => {
    let ruleSet = {};
    switch(nameSet){
        case 'invalid': ruleSet = {
            background: 'red'

        }; break;
        default : ruleSet = {background: 'red'}; break;
    }
    return ruleSet;
}

export default getRuleSet;
