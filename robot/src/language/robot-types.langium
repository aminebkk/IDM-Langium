
interface Program {
	Rfunctions: RFunction[]
}

interface RFunction {
	functionidentifier: string
	type: Type
	block: Block
}

// interface FunctionIdentifier {
// 	name?: string
// }

interface Block extends Statement {
	statement: Statement[]
}

interface Statement {
}

interface Expression extends Statement {
}

interface Speed extends Statement {
	speed: Distance
}

interface Unit {
}

interface BooleanExpression extends Expression {
}

interface ArithmeticExpression extends Expression {
}

interface PrimaryExpression extends ArithmeticExpression {
}

interface Forward extends Movement {
}

interface Movement extends Primitive {
	distance: Distance
}

interface Primitive extends Statement {
}

interface Distance extends Expression {
	valeur?: ArithmeticExpression
	unit: Unit
}

interface Clock extends Primitive {
	angle?: number
}

interface CallFunction extends PrimaryExpression {
	functionidentifier: @RFunction
	parameters: Expression[]
}

interface Var extends Statement {
	varidentifier: string
	type: VariableType
	expression: Expression
}

interface AssignVar extends Statement {
	varidentifier: @Var
	expression: Expression
}

// interface VarIdentifier {
// 	name?: string
// }

interface CallVar extends PrimaryExpression {
	varidentifier: @Var
}

interface Const extends PrimaryExpression {
	value?: number
}

interface Equals extends PrimaryBoolean {
	rightExpression: BinaryExpression
	leftExpression: BinaryExpression
}

interface BinaryExpression extends ArithmeticExpression {
	leftExpression: PrimaryExpression
	rightExpression: BinaryExpression
}

interface Greater extends PrimaryBoolean {
	rightExpression: BinaryExpression
	leftExpression: BinaryExpression
}

interface Lesser extends PrimaryBoolean {
	rightExpression: BinaryExpression
	leftExpression: BinaryExpression
}

interface Add extends BinaryExpression {
}

interface Minus extends BinaryExpression {
}

interface Mul extends BinaryExpression {
}

interface Div extends BinaryExpression {
}

interface Backward extends Movement {
}

interface Left extends Movement {
}

interface Right extends Movement {
}

interface DistanceSensor extends Expression {
	distance?: Distance
	unit: Unit
}

interface TimeSensor extends Expression {
	CurrentMillis?: number
}

interface Condition extends Structure {
	then: Statement
	else?: Statement
}

interface Structure extends Statement {
	Condition: BooleanExpression
}

interface Loop extends Structure {
	statement: Statement
}

interface BooleanOperator extends BooleanExpression {
}

interface OR extends BooleanOperator {
	left: PrimaryBoolean
	right: BooleanOperator
}

interface AND extends BooleanOperator {
	left: PrimaryBoolean
	right: BooleanOperator
}

interface NOT extends BooleanOperator {
	right: BooleanOperator
}

interface PrimaryBoolean extends BooleanExpression {
}

interface TRUE extends PrimaryBoolean {
}

interface FALSE extends PrimaryBoolean {
}

interface Cm extends Unit {
}

interface Mm extends Unit {
}

interface Type{
}

interface VariableType extends Type {
}

interface Void extends Type {
}

interface Int extends VariableType {
}

