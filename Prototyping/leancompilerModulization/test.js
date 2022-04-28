leancompiler = require("./leancompiler")

const testcode = 'variables p q r s : Prop\n'
         + 'theorem and_comm : p ∧ q ↔ q ∧ p :=\n'
         + 'iff.intro\n'
         + '  (assume Hpq : p ∧ q,\n'
         + '    and.intro (and.elim_right Hpq) (and.elim_left Hpq))\n'
         + 'print "end of file!"\n';

function displaymessage(myLeanOutputTracker){
    console.log( 'Lean output: ' + JSON.stringify( myLeanOutputTracker, null, 4 ) );
}
const runcode = leancompiler(displaymessage);
runcode(testcode);