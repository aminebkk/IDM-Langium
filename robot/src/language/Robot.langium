grammar Robot
import 'Terminals'
import 'robot-types'

entry Program returns Program:
    {Program} Rfunctions+=RFunction+
;

Statement returns Statement:
    CallVar | CallFunction | Block | Speed | Forward | Clock | AssignVar | Var | Const | Equals | Greater | Lesser | Add | Minus | Mul | Div | Distance | Backward | Left | Right | DistanceSensor | TimeSensor | Condition | Loop | OR | AND | NOT | TRUE | FALSE 
;

Expression returns Expression:
    CallFunction | CallVar | Const | Equals | Greater | Lesser | Add | Minus | Mul | Div | Distance | DistanceSensor | TimeSensor | OR | AND | NOT | TRUE | FALSE 
;

Unit returns Unit:
    Cm | Mm 
;

BinaryExpression returns BinaryExpression:
    Mul | Div | Add | Minus
;

BooleanExpression returns BooleanExpression:
    Equals | Greater | Lesser | OR | AND | NOT | TRUE | FALSE 
;

ArithmeticExpression returns ArithmeticExpression:
    CallFunction | CallVar | Const | Mul | Div | Add | Minus
;

PrimaryExpression returns PrimaryExpression:
    CallFunction | CallVar | Const
;

RFunction returns RFunction:
    'let' type=Type functionidentifier=EString '(' ')' block=Block  
;

// FunctionIdentifier returns FunctionIdentifier:
//     {FunctionIdentifier} name=EString   
// ;

Block returns Block:
    {Block} '{' statement+=Statement* '}'  
;

EString returns string:
    STRING | ID 
;

Speed returns Speed:
    {Speed} 'setSpeed' '(' speed=Distance ')'
;

Forward returns Forward:
    'Forward' distance=Distance
;

Clock returns Clock:
    {Clock} 'Clock' angle=EInt
;

CallFunction returns CallFunction:
    functionidentifier=[RFunction:EString ] '(' (parameters+=Expression  ("," parameters+=Expression  )* )? ')'
;

Var returns Var:
    'var' type=VariableType varidentifier=ID ( '=' expression=Expression )?
;

AssignVar returns AssignVar:
    varidentifier=[Var:ID] '=' expression=Expression
;

CallVar returns CallVar:
    {CallVar} varidentifier=[Var:ID]
;

Const returns Const:
    {Const} value=EInt
;

Equals returns Equals:
    leftExpression=BinaryExpression "==" rightExpression=BinaryExpression
;

Greater returns Greater:
    leftExpression=BinaryExpression ">" rightExpression=BinaryExpression 
;

Lesser returns Lesser:
    leftExpression=BinaryExpression "<" rightExpression=BinaryExpression 
;

Add returns Add:
    leftExpression=PrimaryExpression ("+" rightExpression=BinaryExpression)?
;

Minus returns Minus:
    leftExpression=PrimaryExpression "-" rightExpression=BinaryExpression 
;

Mul returns Mul:
    leftExpression=PrimaryExpression "*" rightExpression=BinaryExpression 
;

Div returns Div:
    leftExpression=PrimaryExpression "/" rightExpression=BinaryExpression 
;

Distance returns Distance:
    valeur=ArithmeticExpression 'in' unit=Unit  
;

Backward returns Backward:
    'Backward' distance=Distance
;

Left returns Left:
    'Left' distance=Distance
;

Right returns Right:
    'Right' distance=Distance 
;

DistanceSensor returns DistanceSensor:
    {DistanceSensor} 'getDistance' '(' ')' 'in' unit=Unit
;

TimeSensor returns TimeSensor:
    {TimeSensor} 'getTimestamp' '(' ')'  
;

Condition returns Condition:
    'if' '(' Condition=BooleanExpression ')' then=Statement ('else' else=Statement )?  
;

Loop returns Loop:
    'while' '(' Condition=BooleanExpression ')' statement=Statement
;

BooleanOperator returns BooleanOperator:
    OR | AND | NOT
;

OR returns OR:
    {OR} left=PrimaryBoolean ( '||' right=BooleanOperator )?  
;

AND returns AND:
    {AND} left=PrimaryBoolean ( '&&' right=BooleanOperator )?   
;

NOT returns NOT:
    {NOT} '!' right=BooleanOperator
;

PrimaryBoolean returns PrimaryBoolean:
    TRUE | FALSE | Equals | Greater | Lesser
;

TRUE returns TRUE:
    {TRUE} 'TRUE'  
;

FALSE returns FALSE:
    {FALSE} 'FALSE'  
;

EInt returns number:
    '-'? INT  
;

// VarIdentifier returns VarIdentifier:
//     {VarIdentifier} name=EString   
// ;

Cm returns Cm:
    {Cm} 'cm'  
;

Mm returns Mm:
    {Mm} 'mm'  
;

Type returns Type:
    Void | Int
;

VariableType returns VariableType:
    Int
;

Void returns Void:
    {Void} 'void'
;

Int returns Int:
    {Int} 'int'
;
