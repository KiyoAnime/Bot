import { textSync } from 'figlet';
import { grey as gr, yellow as y, redBright as r, greenBright as g, magentaBright as mB } from 'chalk';

const print = console.log;
export default () => {
    console.clear();
    print(mB(textSync('Kiyo  Chan', { horizontalLayout: 'fitted' })));
    print(`${y('#======================')} ${mB.bold('Kiyo Chan')} ${y('======================#')}`);
    print(`${y('#')}         ${g('Created By:  Liam L <TheFallenSpirit>')}         ${y('#')}`);
    print(`${y('#')}    ${r('Copyright © 2023  Liam Labell <TheFallenSpirit>')}    ${y('#')}`);
    print(`${y('#')}               ${gr('Starting Kiyo Chan bot...')}               ${y('#')}`);
    print(y('#=======================================================#'));
};
