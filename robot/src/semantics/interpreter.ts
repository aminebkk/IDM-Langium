// import { AstNode } from "langium";
import { AND, Add, ArithmeticExpression, AssignVar, Backward, BinaryExpression, Block, BooleanExpression, BooleanOperator, CallFunction, CallVar, Clock, Cm, Condition, Const, Distance, DistanceSensor, Div, Equals, Expression, FALSE, Forward, Greater, Int, Left, Lesser, Loop, Minus, Mm, Movement, Mul, NOT, OR, PrimaryBoolean, PrimaryExpression, Primitive, Program, RFunction, Right, Speed, Statement, Structure, TRUE, TimeSensor, Type, Unit, Var, VariableType, Visitor, Void } from "./visitor.js";


export default class Interpreter implements Visitor{
    visitAND(node: AND) {
        throw new Error("Method not implemented.");
    }
    visitAdd(node: Add) {
        throw new Error("Method not implemented.");
    }
    visitArithmeticExpression(node: ArithmeticExpression) {
        throw new Error("Method not implemented.");
    }
    visitAssignVar(node: AssignVar) {
        throw new Error("Method not implemented.");
    }
    visitBackward(node: Backward) {
        throw new Error("Method not implemented.");
    }
    visitBinaryExpression(node: BinaryExpression) {
        throw new Error("Method not implemented.");
    }
    visitBlock(node: Block) {
        node.statement.forEach(statement => statement.accept(this));
    }
    visitBooleanExpression(node: BooleanExpression) {
        throw new Error("Method not implemented.");
    }
    visitBooleanOperator(node: BooleanOperator) {
        throw new Error("Method not implemented.");
    }
    visitCallFunction(node: CallFunction) {
        throw new Error("Method not implemented.");
    }
    visitCallVar(node: CallVar) {
        throw new Error("Method not implemented.");
    }
    visitClock(node: Clock) {
        throw new Error("Method not implemented.");
    }
    visitCm(node: Cm) {
        throw new Error("Method not implemented.");
    }
    visitCondition(node: Condition) {
        throw new Error("Method not implemented.");
    }
    visitConst(node: Const) {
        throw new Error("Method not implemented.");
    }
    visitDistance(node: Distance) {
        throw new Error("Method not implemented.");
    }
    visitDistanceSensor(node: DistanceSensor) {
        throw new Error("Method not implemented.");
    }
    visitDiv(node: Div) {
        throw new Error("Method not implemented.");
    }
    visitEquals(node: Equals) {
        throw new Error("Method not implemented.");
    }
    visitExpression(node: Expression) {
        throw new Error("Method not implemented.");
    }
    visitFALSE(node: FALSE) {
        throw new Error("Method not implemented.");
    }
    visitForward(node: Forward) {
        throw new Error("Method not implemented.");
    }
    visitGreater(node: Greater) {
        throw new Error("Method not implemented.");
    }
    visitInt(node: Int) {
        throw new Error("Method not implemented.");
    }
    visitLeft(node: Left) {
        throw new Error("Method not implemented.");
    }
    visitLesser(node: Lesser) {
        throw new Error("Method not implemented.");
    }
    visitLoop(node: Loop) {
        throw new Error("Method not implemented.");
    }
    visitMinus(node: Minus) {
        throw new Error("Method not implemented.");
    }
    visitMm(node: Mm) {
        throw new Error("Method not implemented.");
    }
    visitMovement(node: Movement) {
        throw new Error("Method not implemented.");
    }
    visitMul(node: Mul) {
        throw new Error("Method not implemented.");
    }
    visitNOT(node: NOT) {
        throw new Error("Method not implemented.");
    }
    visitOR(node: OR) {
        throw new Error("Method not implemented.");
    }
    visitPrimaryBoolean(node: PrimaryBoolean) {
        throw new Error("Method not implemented.");
    }
    visitPrimaryExpression(node: PrimaryExpression) {
        throw new Error("Method not implemented.");
    }
    visitPrimitive(node: Primitive) {
        throw new Error("Method not implemented.");
    }
    visitProgram(node: Program) {
        // node.Rfunctions.forEach(rFunction => 
        //     rFunction.accept(this)
        // )
        console.log("visite program");
    }
    visitRFunction(node: RFunction) {
        //TODO: Parameters
        node.block.accept(this)
    }
    visitRight(node: Right) {
        throw new Error("Method not implemented.");
    }
    visitSpeed(node: Speed) {
        throw new Error("Method not implemented.");
    }
    visitStatement(node: Statement) {
        throw new Error("Method not implemented.");
    }
    visitStructure(node: Structure) {
        throw new Error("Method not implemented.");
    }
    visitTRUE(node: TRUE) {
        throw new Error("Method not implemented.");
    }
    visitTimeSensor(node: TimeSensor) {
        throw new Error("Method not implemented.");
    }
    visitType(node: Type) {
        throw new Error("Method not implemented.");
    }
    visitUnit(node: Unit) {
        throw new Error("Method not implemented.");
    }
    visitVar(node: Var) {
        throw new Error("Method not implemented.");
    }
    visitVariableType(node: VariableType) {
        throw new Error("Method not implemented.");
    }
    visitVoid(node: Void) {
        throw new Error("Method not implemented.");
    }
    
}