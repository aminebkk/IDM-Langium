// import type { Program } from '../language/generated/ast.js';
import type { Program } from '../semantics/visitor.js';
import chalk from 'chalk';
import { Command } from 'commander';
import { createRobotServices } from '../language/robot-module.js';
import { extractDocument } from './cli-util.js';
import { NodeFileSystem } from 'langium/node';
import Interpreter from '../semantics/interpreter.js';


// export const generateAction = async (fileName: string, opts: GenerateOptions): Promise<void> => {
//     const services = createRobotServices(NodeFileSystem).Robot;
//     const model = await extractAstNode<Program>(fileName, services);
//     const generatedFilePath = generateCommands(model, fileName, opts.destination);
//     console.log(chalk.green(`JavaScript code generated successfully: ${generatedFilePath}`));
// };

// export type GenerateOptions = {
//     destination?: string;
// }

export default function(): void {
    console.log("here")
    const program = new Command();

    program
        // eslint-disable-next-line @typescript-eslint/no-var-requires
        .version(require('../../package.json').version);

    // const fileExtensions = RobotLanguageMetaData.fileExtensions.join(', ');
    program
    .command('parseAndValidate')
    .argument('<file>', 'Source file to parse & validate (ending in ${fileExtensions})')
    .description('Indicates where a program parses & validates successfully, but produces no output code')
    .action(parseAndValidate) // we'll need to implement this function

    program.parse(process.argv);
}

export const parseAndValidate = async (fileName: string): Promise<void> => {
    console.log("parse and validate")
    // retrieve the services for our language
    const services = createRobotServices(NodeFileSystem).Robot;
    // extract a document for our program
    const document = await extractDocument(fileName, services);
    // extract the parse result details
    const parseResult = document.parseResult;
    // verify no lexer, parser, or general diagnostic errors show up
    if (parseResult.lexerErrors.length === 0 && 
        parseResult.parserErrors.length === 0
    ) {
        let interpreter = new Interpreter();
        interpreter.visitProgram(parseResult.value as Program);
        console.log(chalk.green(`Parsed and validated ${fileName} successfully!`));
    } else {
        console.log(chalk.red(`Failed to parse and validate ${fileName}!`));
    }
};