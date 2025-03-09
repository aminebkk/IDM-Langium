
import * as ASTInterfaces from '../language/generated/ast.js';
import { Reference } from 'langium';

export interface Visitor{
    visitAND(node : AND) : any;
	visitAdd(node : Add) : any;
	visitArithmeticExpression(node : ArithmeticExpression) : any;
	visitAssignVar(node : AssignVar) : any;
	visitBackward(node : Backward) : any;
	visitBinaryExpression(node : BinaryExpression) : any;
	visitBlock(node : Block) : any;
	visitBooleanExpression(node : BooleanExpression) : any;
	visitBooleanOperator(node : BooleanOperator) : any;
	visitCallFunction(node : CallFunction) : any;
	visitCallVar(node : CallVar) : any;
	visitClock(node : Clock) : any;
	visitCm(node : Cm) : any;
	visitCondition(node : Condition) : any;
	visitConst(node : Const) : any;
	visitDistance(node : Distance) : any;
	visitDistanceSensor(node : DistanceSensor) : any;
	visitDiv(node : Div) : any;
	visitEquals(node : Equals) : any;
	visitExpression(node : Expression) : any;
	visitFALSE(node : FALSE) : any;
	visitForward(node : Forward) : any;
	visitGreater(node : Greater) : any;
	visitInt(node : Int) : any;
	visitLeft(node : Left) : any;
	visitLesser(node : Lesser) : any;
	visitLoop(node : Loop) : any;
	visitMinus(node : Minus) : any;
	visitMm(node : Mm) : any;
	visitMovement(node : Movement) : any;
	visitMul(node : Mul) : any;
	visitNOT(node : NOT) : any;
	visitOR(node : OR) : any;
	visitPrimaryBoolean(node : PrimaryBoolean) : any;
	visitPrimaryExpression(node : PrimaryExpression) : any;
	visitPrimitive(node : Primitive) : any;
	visitProgram(node : Program) : any;
	visitRFunction(node : RFunction) : any;
	visitRight(node : Right) : any;
	visitSpeed(node : Speed) : any;
	visitStatement(node : Statement) : any;
	visitStructure(node : Structure) : any;
	visitTRUE(node : TRUE) : any;
	visitTimeSensor(node : TimeSensor) : any;
	visitType(node : Type) : any;
	visitUnit(node : Unit) : any;
	visitVar(node : Var) : any;
	visitVariableType(node : VariableType) : any;
	visitVoid(node : Void) : any;
}


export class AND implements ASTInterfaces.AND {
    // the constructor must take all attribute of the implemented interface 
    // simply copy-paste the interface fields as public parameters
    // you can find them in generated/ast.ts
    constructor(public $type: 'AND', public left: PrimaryBoolean, public right: BooleanOperator){}
    accept(visitor: Visitor) : any {}
}

export class Add implements ASTInterfaces.Add {
    // the constructor must take all attribute of the implemented interface 
    // simply copy-paste the interface fields as public parameters
    // you can find them in generated/ast.ts
    constructor(public $type: 'Add', public leftExpression: PrimaryExpression, public rightExpression: BinaryExpression){}
    accept(visitor: Visitor) : any {}
}

export class ArithmeticExpression implements ASTInterfaces.ArithmeticExpression {
    // the constructor must take all attribute of the implemented interface 
    // simply copy-paste the interface fields as public parameters
    // you can find them in generated/ast.ts
    constructor(public $type: 'ArithmeticExpression'){}
    accept(visitor: Visitor) : any {}
}

export class AssignVar implements ASTInterfaces.AssignVar {
    // the constructor must take all attribute of the implemented interface 
    // simply copy-paste the interface fields as public parameters
    // you can find them in generated/ast.ts
    constructor(public $type: 'AssignVar', public expression: Expression, public varidentifier: Reference<Var>){}
    accept(visitor: Visitor) : any {}
}

export class Backward implements ASTInterfaces.Backward {
    // the constructor must take all attribute of the implemented interface 
    // simply copy-paste the interface fields as public parameters
    // you can find them in generated/ast.ts
    constructor(public $type: 'Backward', public distance: Distance){}
    accept(visitor: Visitor) : any {}
}

export class BinaryExpression implements BinaryExpression {
    // the constructor must take all attribute of the implemented interface 
    // simply copy-paste the interface fields as public parameters
    // you can find them in generated/ast.ts
    constructor(public $type: 'BinaryExpression', public leftExpression: PrimaryExpression, public rightExpression: BinaryExpression){}
    accept(visitor: Visitor) : any {}
}

export class Block implements ASTInterfaces.Block {
    // the constructor must take all attribute of the implemented interface 
    // simply copy-paste the interface fields as public parameters
    // you can find them in generated/ast.ts
    constructor(public $type: 'Block', public $container: RFunction, public statement: Array<Statement>){}
    accept(visitor: Visitor) : any {}
}

export class BooleanExpression implements ASTInterfaces.BooleanExpression {
    // the constructor must take all attribute of the implemented interface 
    // simply copy-paste the interface fields as public parameters
    // you can find them in generated/ast.ts
    constructor(public $type: 'BooleanExpression'){}
    accept(visitor: Visitor) : any {}
}

export class BooleanOperator implements ASTInterfaces.BooleanOperator {
    // the constructor must take all attribute of the implemented interface 
    // simply copy-paste the interface fields as public parameters
    // you can find them in generated/ast.ts
    constructor(public $type: 'BooleanOperator'){}
    accept(visitor: Visitor) : any {}
}

export class CallFunction implements ASTInterfaces.CallFunction {
    // the constructor must take all attribute of the implemented interface 
    // simply copy-paste the interface fields as public parameters
    // you can find them in generated/ast.ts
    constructor(public $type: 'CallFunction', public functionidentifier: Reference<RFunction>, public parameters: Array<Expression>){}
    accept(visitor: Visitor) : any {}
}

export class CallVar implements ASTInterfaces.CallVar {
    // the constructor must take all attribute of the implemented interface 
    // simply copy-paste the interface fields as public parameters
    // you can find them in generated/ast.ts
    constructor(public $type: 'CallVar', public varidentifier: Reference<Var>){}
    accept(visitor: Visitor) : any {}
}

export class Clock implements ASTInterfaces.Clock {
    // the constructor must take all attribute of the implemented interface 
    // simply copy-paste the interface fields as public parameters
    // you can find them in generated/ast.ts
    constructor(public $type: 'Clock', public angle?: number){}
    accept(visitor: Visitor) : any {}
}

export class Cm implements ASTInterfaces.Cm {
    // the constructor must take all attribute of the implemented interface 
    // simply copy-paste the interface fields as public parameters
    // you can find them in generated/ast.ts
    constructor(public $type: 'Cm'){}
    accept(visitor: Visitor) : any {}
}

export class Condition implements ASTInterfaces.Condition {
    // the constructor must take all attribute of the implemented interface 
    // simply copy-paste the interface fields as public parameters
    // you can find them in generated/ast.ts
    constructor(public $type: 'Condition', public Condition: BooleanExpression, public then: Statement,  public $else?: Statement){}
    accept(visitor: Visitor) : any {}
}

export class Const implements ASTInterfaces.Const {
    // the constructor must take all attribute of the implemented interface 
    // simply copy-paste the interface fields as public parameters
    // you can find them in generated/ast.ts
    constructor(public $type: 'Const', public value?: number){}
    accept(visitor: Visitor) : any {}
}

export class Distance implements ASTInterfaces.Distance {
    // the constructor must take all attribute of the implemented interface 
    // simply copy-paste the interface fields as public parameters
    // you can find them in generated/ast.ts
    constructor(public $type: 'Distance', public $container: DistanceSensor | Movement | Speed, public unit: Unit, public valeur?: ArithmeticExpression){}
    accept(visitor: Visitor) : any {}
}

export class DistanceSensor implements ASTInterfaces.DistanceSensor {
    // the constructor must take all attribute of the implemented interface 
    // simply copy-paste the interface fields as public parameters
    // you can find them in generated/ast.ts
    constructor(public $type: 'DistanceSensor', public unit: Unit, public distance?: Distance){}
    accept(visitor: Visitor) : any {}
}

export class Div implements ASTInterfaces.Div {
    // the constructor must take all attribute of the implemented interface 
    // simply copy-paste the interface fields as public parameters
    // you can find them in generated/ast.ts
    constructor(public $type: 'Div', public leftExpression: PrimaryExpression, public rightExpression: BinaryExpression){}
    accept(visitor: Visitor) : any {}
}

export class Equals implements ASTInterfaces.Equals {
    // the constructor must take all attribute of the implemented interface 
    // simply copy-paste the interface fields as public parameters
    // you can find them in generated/ast.ts
    constructor(public $type: 'Equals', public leftExpression: BinaryExpression, public rightExpression: BinaryExpression){}
    accept(visitor: Visitor) : any {}
}

export class Expression implements ASTInterfaces.Expression {
    // the constructor must take all attribute of the implemented interface 
    // simply copy-paste the interface fields as public parameters
    // you can find them in generated/ast.ts
    constructor(public $type: 'Expression'){}
    accept(visitor: Visitor) : any {}
}

export class FALSE implements ASTInterfaces.FALSE {
    // the constructor must take all attribute of the implemented interface 
    // simply copy-paste the interface fields as public parameters
    // you can find them in generated/ast.ts
    constructor(public $type: 'FALSE'){}
    accept(visitor: Visitor) : any {}
}

export class Forward implements ASTInterfaces.Forward {
    // the constructor must take all attribute of the implemented interface 
    // simply copy-paste the interface fields as public parameters
    // you can find them in generated/ast.ts
    constructor(public $type: 'Forward', public distance: Distance){}
    accept(visitor: Visitor) : any {}
}

export class Greater implements ASTInterfaces.Greater {
    // the constructor must take all attribute of the implemented interface 
    // simply copy-paste the interface fields as public parameters
    // you can find them in generated/ast.ts
    constructor(public $type: 'Greater', public leftExpression: BinaryExpression, public rightExpression: BinaryExpression){}
    accept(visitor: Visitor) : any {}
}

export class Int implements ASTInterfaces.Int {
    // the constructor must take all attribute of the implemented interface 
    // simply copy-paste the interface fields as public parameters
    // you can find them in generated/ast.ts
    constructor(public $type: 'Int'){}
    accept(visitor: Visitor) : any {}
}

export class Left implements ASTInterfaces.Left {
    // the constructor must take all attribute of the implemented interface 
    // simply copy-paste the interface fields as public parameters
    // you can find them in generated/ast.ts
    constructor(public $type: 'Left', public distance: Distance){}
    accept(visitor: Visitor) : any {}
}

export class Lesser implements ASTInterfaces.Lesser {
    // the constructor must take all attribute of the implemented interface 
    // simply copy-paste the interface fields as public parameters
    // you can find them in generated/ast.ts
    constructor(public $type: 'Lesser', public leftExpression: BinaryExpression, public rightExpression: BinaryExpression){}
    accept(visitor: Visitor) : any {}
}

export class Loop implements ASTInterfaces.Loop {
    // the constructor must take all attribute of the implemented interface 
    // simply copy-paste the interface fields as public parameters
    // you can find them in generated/ast.ts
    constructor(public $type: 'Loop', public Condition: BooleanExpression, public statement: Statement){}
    accept(visitor: Visitor) : any {}
}

export class Minus implements ASTInterfaces.Minus {
    // the constructor must take all attribute of the implemented interface 
    // simply copy-paste the interface fields as public parameters
    // you can find them in generated/ast.ts
    constructor(public $type: 'Minus', public leftExpression: PrimaryExpression, public rightExpression: BinaryExpression){}
    accept(visitor: Visitor) : any {}
}

export class Mm implements ASTInterfaces.Mm {
    // the constructor must take all attribute of the implemented interface 
    // simply copy-paste the interface fields as public parameters
    // you can find them in generated/ast.ts
    constructor(public $type: 'Mm'){}
    accept(visitor: Visitor) : any {}
}

export class Movement implements ASTInterfaces.Movement {
    // the constructor must take all attribute of the implemented interface 
    // simply copy-paste the interface fields as public parameters
    // you can find them in generated/ast.ts
    constructor(public $type: 'Movement', public distance: Distance){}
    accept(visitor: Visitor) : any {}
}

export class Mul implements ASTInterfaces.Mul {
    // the constructor must take all attribute of the implemented interface 
    // simply copy-paste the interface fields as public parameters
    // you can find them in generated/ast.ts
    constructor(public $type: 'Mul', public leftExpression: PrimaryExpression, public rightExpression: BinaryExpression){}
    accept(visitor: Visitor) : any {}
}

export class NOT implements ASTInterfaces.NOT {
    // the constructor must take all attribute of the implemented interface 
    // simply copy-paste the interface fields as public parameters
    // you can find them in generated/ast.ts
    constructor(public $type: 'NOT', public right: BooleanOperator){}
    accept(visitor: Visitor) : any {}
}

export class OR implements ASTInterfaces.OR {
    // the constructor must take all attribute of the implemented interface 
    // simply copy-paste the interface fields as public parameters
    // you can find them in generated/ast.ts
    constructor(public $type: 'OR', public left: PrimaryBoolean, public right: BooleanOperator){}
    accept(visitor: Visitor) : any {}
}

export class PrimaryBoolean implements ASTInterfaces.PrimaryBoolean {
    // the constructor must take all attribute of the implemented interface 
    // simply copy-paste the interface fields as public parameters
    // you can find them in generated/ast.ts
    constructor(public $type: 'PrimaryBoolean'){}
    accept(visitor: Visitor) : any {}
}

export class PrimaryExpression implements ASTInterfaces.PrimaryExpression {
    // the constructor must take all attribute of the implemented interface 
    // simply copy-paste the interface fields as public parameters
    // you can find them in generated/ast.ts
    constructor(public $type: 'PrimaryExpression'){}
    accept(visitor: Visitor) : any {}
}

export class Primitive implements ASTInterfaces.Primitive {
    // the constructor must take all attribute of the implemented interface 
    // simply copy-paste the interface fields as public parameters
    // you can find them in generated/ast.ts
    constructor(public $type: 'Primitive'){}
    accept(visitor: Visitor) : any {}
}

export class Program implements ASTInterfaces.Program {
    // the constructor must take all attribute of the implemented interface 
    // simply copy-paste the interface fields as public parameters
    // you can find them in generated/ast.ts
    constructor(public $type: 'Program', public Rfunctions: Array<RFunction>){}
    accept(visitor: Visitor) : any {}
}

export class RFunction implements ASTInterfaces.RFunction {
    // the constructor must take all attribute of the implemented interface 
    // simply copy-paste the interface fields as public parameters
    // you can find them in generated/ast.ts
    constructor(public $type: 'RFunction', public $container: Program, public block: Block, public functionidentifier: string, public type: Type){}
    accept(visitor: Visitor) : any {}
}

export class Right implements ASTInterfaces.Right {
    // the constructor must take all attribute of the implemented interface 
    // simply copy-paste the interface fields as public parameters
    // you can find them in generated/ast.ts
    constructor(public $type: 'Right', public distance: Distance){}
    accept(visitor: Visitor) : any {}
}

export class Speed implements ASTInterfaces.Speed {
    // the constructor must take all attribute of the implemented interface 
    // simply copy-paste the interface fields as public parameters
    // you can find them in generated/ast.ts
    constructor(public $type: 'Speed', public  speed: Distance){}
    accept(visitor: Visitor) : any {}
}

export class Statement implements ASTInterfaces.Statement {
    // the constructor must take all attribute of the implemented interface 
    // simply copy-paste the interface fields as public parameters
    // you can find them in generated/ast.ts
    constructor(public $type: 'Statement'){}
    accept(visitor: Visitor) : any {}
}

export class Structure implements ASTInterfaces.Structure {
    // the constructor must take all attribute of the implemented interface 
    // simply copy-paste the in terface fields as public parameters
    // you can find them in generated/ast.ts
    constructor(public $type: 'Structure', public Condition: BooleanExpression){}
    accept(visitor: Visitor) : any {}
}

export class TRUE implements ASTInterfaces.TRUE {
    // the constructor must take all attribute of the implemented interface 
    // simply copy-paste the interface fields as public parameters
    // you can find them in generated/ast.ts
    constructor(public $type: 'TRUE'){}
    accept(visitor: Visitor) : any {}
}

export class TimeSensor implements ASTInterfaces.TimeSensor {
    // the constructor must take all attribute of the implemented interface 
    // simply copy-paste the interface fields as public parameters
    // you can find them in generated/ast.ts
    constructor(public $type: 'TimeSensor'){}
    accept(visitor: Visitor) : any {}
}

export class Type implements ASTInterfaces.Type {
    // the constructor must take all attribute of the implemented interface 
    // simply copy-paste the interface fields as public parameters
    // you can find them in generated/ast.ts
    constructor(public $type: 'Type'){}
    accept(visitor: Visitor) : any {}
}

export class Unit implements ASTInterfaces.Unit {
    // the constructor must take all attribute of the implemented interface 
    // simply copy-paste the interface fields as public parameters
    // you can find them in generated/ast.ts
    constructor(public $type: 'Unit'){}
    accept(visitor: Visitor) : any {}
}

export class Var implements ASTInterfaces.Var {
    // the constructor must take all attribute of the implemented interface 
    // simply copy-paste the interface fields as public parameters
    // you can find them in generated/ast.ts
    constructor(public $type: 'Var', public expression: Expression, public type: VariableType, public varidentifier: string){}
    accept(visitor: Visitor) : any {}
}

export class VariableType implements ASTInterfaces.VariableType {
    // the constructor must take all attribute of the implemented interface 
    // simply copy-paste the interface fields as public parameters
    // you can find them in generated/ast.ts
    constructor(public $type: 'VariableType'){}
    accept(visitor: Visitor) : any {}
}

export class Void implements ASTInterfaces.Void {
    // the constructor must take all attribute of the implemented interface 
    // simply copy-paste the interface fields as public parameters
    // you can find them in generated/ast.ts
    constructor(public $type: 'Void'){}
    accept(visitor: Visitor) : any {}
}

