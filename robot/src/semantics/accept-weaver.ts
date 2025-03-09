
import type { ValidationAcceptor, ValidationChecks } from 'langium';
import type { RobotAstType } from '../language/generated/ast.js';
import * as InterfaceAST from '../language/generated/ast.js';
import * as ClassAST from './visitor.js';
import { Visitor } from './visitor.js';
import type { RobotServices } from '../language/robot-module.js';

/**
 * Register custom validation checks.
 * TODO : Call this function in the language module.ts file (see registerValidationChecks(...);)
 */
export function weaveAcceptMethods(services: RobotServices) {
    const registry = services.validation.ValidationRegistry;
    const weaver = services.validation.RobotAcceptWeaver;
    registry.register(weaver.checks, weaver);
}

export class RobotAcceptWeaver {
    
    // TODO : Remove lines for abstract concepts
    checks: ValidationChecks<RobotAstType> = {
        AND : this.weaveAND,
		Add : this.weaveAdd,
		// ArithmeticExpression : this.weaveArithmeticExpression,
		AssignVar : this.weaveAssignVar,
		Backward : this.weaveBackward,
		// BinaryExpression : this.weaveBinaryExpression,
		Block : this.weaveBlock,
		// BooleanExpression : this.weaveBooleanExpression,
		// BooleanOperator : this.weaveBooleanOperator,
		CallFunction : this.weaveCallFunction,
		CallVar : this.weaveCallVar,
		Clock : this.weaveClock,
		Cm : this.weaveCm,
		Condition : this.weaveCondition,
		Const : this.weaveConst,
		Distance : this.weaveDistance,
		DistanceSensor : this.weaveDistanceSensor,
		Div : this.weaveDiv,
		Equals : this.weaveEquals,
		// Expression : this.weaveExpression,
		FALSE : this.weaveFALSE,
		Forward : this.weaveForward,
		Greater : this.weaveGreater,
		Int : this.weaveInt,
		Left : this.weaveLeft,
		Lesser : this.weaveLesser,
		Loop : this.weaveLoop,
		Minus : this.weaveMinus,
		Mm : this.weaveMm,
		// Movement : this.weaveMovement,
		Mul : this.weaveMul,
		NOT : this.weaveNOT,
		OR : this.weaveOR,
		// PrimaryBoolean : this.weavePrimaryBoolean,
		// PrimaryExpression : this.weavePrimaryExpression,
		// Primitive : this.weavePrimitive,
		Program : this.weaveProgram,
		RFunction : this.weaveRFunction,
		Right : this.weaveRight,
		Speed : this.weaveSpeed,
		// Statement : this.weaveStatement,
		// Structure : this.weaveStructure,
		TRUE : this.weaveTRUE,
		TimeSensor : this.weaveTimeSensor,
		Type : this.weaveType,
		// Unit : this.weaveUnit,
		Var : this.weaveVar,
		// VariableType : this.weaveVariableType,
		Void : this.weaveVoid
    };

    
weaveAND(node : InterfaceAST.AND, accept : ValidationAcceptor) : void {
    (<any> node).accept = (visitor: Visitor) => { return visitor.visitAND(node as unknown as ClassAST.AND); }
}

weaveAdd(node : InterfaceAST.Add, accept : ValidationAcceptor) : void {
    (<any> node).accept = (visitor: Visitor) => { return visitor.visitAdd(node as unknown as ClassAST.Add); }
}

weaveArithmeticExpression(node : InterfaceAST.ArithmeticExpression, accept : ValidationAcceptor) : void {
    (<any> node).accept = (visitor: Visitor) => { return visitor.visitArithmeticExpression(node as unknown as ClassAST.ArithmeticExpression); }
}

weaveAssignVar(node : InterfaceAST.AssignVar, accept : ValidationAcceptor) : void {
    (<any> node).accept = (visitor: Visitor) => { return visitor.visitAssignVar(node as unknown as ClassAST.AssignVar); }
}

weaveBackward(node : InterfaceAST.Backward, accept : ValidationAcceptor) : void {
    (<any> node).accept = (visitor: Visitor) => { return visitor.visitBackward(node as unknown as ClassAST.Backward); }
}

weaveBinaryExpression(node : InterfaceAST.BinaryExpression, accept : ValidationAcceptor) : void {
    (<any> node).accept = (visitor: Visitor) => { return visitor.visitBinaryExpression(node as unknown as ClassAST.BinaryExpression); }
}

weaveBlock(node : InterfaceAST.Block, accept : ValidationAcceptor) : void {
    (<any> node).accept = (visitor: Visitor) => { return visitor.visitBlock(node as unknown as ClassAST.Block); }
}

weaveBooleanExpression(node : InterfaceAST.BooleanExpression, accept : ValidationAcceptor) : void {
    (<any> node).accept = (visitor: Visitor) => { return visitor.visitBooleanExpression(node as unknown as ClassAST.BooleanExpression); }
}

weaveBooleanOperator(node : InterfaceAST.BooleanOperator, accept : ValidationAcceptor) : void {
    (<any> node).accept = (visitor: Visitor) => { return visitor.visitBooleanOperator(node as unknown as ClassAST.BooleanOperator); }
}

weaveCallFunction(node : InterfaceAST.CallFunction, accept : ValidationAcceptor) : void {
    (<any> node).accept = (visitor: Visitor) => { return visitor.visitCallFunction(node as unknown as ClassAST.CallFunction); }
}

weaveCallVar(node : InterfaceAST.CallVar, accept : ValidationAcceptor) : void {
    (<any> node).accept = (visitor: Visitor) => { return visitor.visitCallVar(node as unknown as ClassAST.CallVar); }
}

weaveClock(node : InterfaceAST.Clock, accept : ValidationAcceptor) : void {
    (<any> node).accept = (visitor: Visitor) => { return visitor.visitClock(node as unknown as ClassAST.Clock); }
}

weaveCm(node : InterfaceAST.Cm, accept : ValidationAcceptor) : void {
    (<any> node).accept = (visitor: Visitor) => { return visitor.visitCm(node as unknown as ClassAST.Cm); }
}

weaveCondition(node : InterfaceAST.Condition, accept : ValidationAcceptor) : void {
    (<any> node).accept = (visitor: Visitor) => { return visitor.visitCondition(node as unknown as ClassAST.Condition); }
}

weaveConst(node : InterfaceAST.Const, accept : ValidationAcceptor) : void {
    (<any> node).accept = (visitor: Visitor) => { return visitor.visitConst(node as unknown as ClassAST.Const); }
}

weaveDistance(node : InterfaceAST.Distance, accept : ValidationAcceptor) : void {
    (<any> node).accept = (visitor: Visitor) => { return visitor.visitDistance(node as unknown as ClassAST.Distance); }
}

weaveDistanceSensor(node : InterfaceAST.DistanceSensor, accept : ValidationAcceptor) : void {
    (<any> node).accept = (visitor: Visitor) => { return visitor.visitDistanceSensor(node as unknown as ClassAST.DistanceSensor); }
}

weaveDiv(node : InterfaceAST.Div, accept : ValidationAcceptor) : void {
    (<any> node).accept = (visitor: Visitor) => { return visitor.visitDiv(node as unknown as ClassAST.Div); }
}

weaveEquals(node : InterfaceAST.Equals, accept : ValidationAcceptor) : void {
    (<any> node).accept = (visitor: Visitor) => { return visitor.visitEquals(node as unknown as ClassAST.Equals); }
}

weaveExpression(node : InterfaceAST.Expression, accept : ValidationAcceptor) : void {
    (<any> node).accept = (visitor: Visitor) => { return visitor.visitExpression(node as unknown as ClassAST.Expression); }
}

weaveFALSE(node : InterfaceAST.FALSE, accept : ValidationAcceptor) : void {
    (<any> node).accept = (visitor: Visitor) => { return visitor.visitFALSE(node as unknown as ClassAST.FALSE); }
}

weaveForward(node : InterfaceAST.Forward, accept : ValidationAcceptor) : void {
    (<any> node).accept = (visitor: Visitor) => { return visitor.visitForward(node as unknown as ClassAST.Forward); }
}

weaveGreater(node : InterfaceAST.Greater, accept : ValidationAcceptor) : void {
    (<any> node).accept = (visitor: Visitor) => { return visitor.visitGreater(node as unknown as ClassAST.Greater); }
}

weaveInt(node : InterfaceAST.Int, accept : ValidationAcceptor) : void {
    (<any> node).accept = (visitor: Visitor) => { return visitor.visitInt(node as unknown as ClassAST.Int); }
}

weaveLeft(node : InterfaceAST.Left, accept : ValidationAcceptor) : void {
    (<any> node).accept = (visitor: Visitor) => { return visitor.visitLeft(node as unknown as ClassAST.Left); }
}

weaveLesser(node : InterfaceAST.Lesser, accept : ValidationAcceptor) : void {
    (<any> node).accept = (visitor: Visitor) => { return visitor.visitLesser(node as unknown as ClassAST.Lesser); }
}

weaveLoop(node : InterfaceAST.Loop, accept : ValidationAcceptor) : void {
    (<any> node).accept = (visitor: Visitor) => { return visitor.visitLoop(node as unknown as ClassAST.Loop); }
}

weaveMinus(node : InterfaceAST.Minus, accept : ValidationAcceptor) : void {
    (<any> node).accept = (visitor: Visitor) => { return visitor.visitMinus(node as unknown as ClassAST.Minus); }
}

weaveMm(node : InterfaceAST.Mm, accept : ValidationAcceptor) : void {
    (<any> node).accept = (visitor: Visitor) => { return visitor.visitMm(node as unknown as ClassAST.Mm); }
}

weaveMovement(node : InterfaceAST.Movement, accept : ValidationAcceptor) : void {
    (<any> node).accept = (visitor: Visitor) => { return visitor.visitMovement(node as unknown as ClassAST.Movement); }
}

weaveMul(node : InterfaceAST.Mul, accept : ValidationAcceptor) : void {
    (<any> node).accept = (visitor: Visitor) => { return visitor.visitMul(node as unknown as ClassAST.Mul); }
}

weaveNOT(node : InterfaceAST.NOT, accept : ValidationAcceptor) : void {
    (<any> node).accept = (visitor: Visitor) => { return visitor.visitNOT(node as unknown as ClassAST.NOT); }
}

weaveOR(node : InterfaceAST.OR, accept : ValidationAcceptor) : void {
    (<any> node).accept = (visitor: Visitor) => { return visitor.visitOR(node as unknown as ClassAST.OR); }
}

weavePrimaryBoolean(node : InterfaceAST.PrimaryBoolean, accept : ValidationAcceptor) : void {
    (<any> node).accept = (visitor: Visitor) => { return visitor.visitPrimaryBoolean(node as unknown as ClassAST.PrimaryBoolean); }
}

weavePrimaryExpression(node : InterfaceAST.PrimaryExpression, accept : ValidationAcceptor) : void {
    (<any> node).accept = (visitor: Visitor) => { return visitor.visitPrimaryExpression(node as unknown as ClassAST.PrimaryExpression); }
}

weavePrimitive(node : InterfaceAST.Primitive, accept : ValidationAcceptor) : void {
    (<any> node).accept = (visitor: Visitor) => { return visitor.visitPrimitive(node as unknown as ClassAST.Primitive); }
}

weaveProgram(node : InterfaceAST.Program, accept : ValidationAcceptor) : void {
    (<any> node).accept = (visitor: Visitor) => { return visitor.visitProgram(node as unknown as ClassAST.Program); }
}

weaveRFunction(node : InterfaceAST.RFunction, accept : ValidationAcceptor) : void {
    (<any> node).accept = (visitor: Visitor) => { return visitor.visitRFunction(node as unknown as ClassAST.RFunction); }
}

weaveRight(node : InterfaceAST.Right, accept : ValidationAcceptor) : void {
    (<any> node).accept = (visitor: Visitor) => { return visitor.visitRight(node as unknown as ClassAST.Right); }
}

weaveSpeed(node : InterfaceAST.Speed, accept : ValidationAcceptor) : void {
    (<any> node).accept = (visitor: Visitor) => { return visitor.visitSpeed(node as unknown as ClassAST.Speed); }
}

weaveStatement(node : InterfaceAST.Statement, accept : ValidationAcceptor) : void {
    (<any> node).accept = (visitor: Visitor) => { return visitor.visitStatement(node as unknown as ClassAST.Statement); }
}

weaveStructure(node : InterfaceAST.Structure, accept : ValidationAcceptor) : void {
    (<any> node).accept = (visitor: Visitor) => { return visitor.visitStructure(node as unknown as ClassAST.Structure); }
}

weaveTRUE(node : InterfaceAST.TRUE, accept : ValidationAcceptor) : void {
    (<any> node).accept = (visitor: Visitor) => { return visitor.visitTRUE(node as unknown as ClassAST.TRUE); }
}

weaveTimeSensor(node : InterfaceAST.TimeSensor, accept : ValidationAcceptor) : void {
    (<any> node).accept = (visitor: Visitor) => { return visitor.visitTimeSensor(node as unknown as ClassAST.TimeSensor); }
}

weaveType(node : InterfaceAST.Type, accept : ValidationAcceptor) : void {
    (<any> node).accept = (visitor: Visitor) => { return visitor.visitType(node as unknown as ClassAST.Type); }
}

weaveUnit(node : InterfaceAST.Unit, accept : ValidationAcceptor) : void {
    (<any> node).accept = (visitor: Visitor) => { return visitor.visitUnit(node as unknown as ClassAST.Unit); }
}

weaveVar(node : InterfaceAST.Var, accept : ValidationAcceptor) : void {
    (<any> node).accept = (visitor: Visitor) => { return visitor.visitVar(node as unknown as ClassAST.Var); }
}

weaveVariableType(node : InterfaceAST.VariableType, accept : ValidationAcceptor) : void {
    (<any> node).accept = (visitor: Visitor) => { return visitor.visitVariableType(node as unknown as ClassAST.VariableType); }
}

weaveVoid(node : InterfaceAST.Void, accept : ValidationAcceptor) : void {
    (<any> node).accept = (visitor: Visitor) => { return visitor.visitVoid(node as unknown as ClassAST.Void); }
}


}
