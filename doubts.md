


- APB doubts
1. in which api should we ask for "end-user's" email+phone
2. what user level feild will we get (assumed to be : name/email/phone/dob/gender/pincode/APB uniq id)
3. do all response contain "status" , "statusMsg"
4. is "status" string or number
5. can we follow kenko response convention 
 {
    logId : "",
    code : 200
    data : {} //contains actual resp,
 }

6. what feilds from plan are we supposed to send (plan-id , plan-name , plan-amt for now added)
7. in payment status api , are we considering only 2 secnarios , txn-not-found , txn-success ? why not txn-pending

8. instead of payment status , can biller post on a webhook of APB ??
9. date time feild proposed to be EPOCH ?







suggestions from Pradeep
1. origin can be one value from set of values , modification in DB required (map)
2. add check for duplicate CRM contact ID
3. new column in ReqLog for status of plan creation


internal doubts
-while creating user there can be 4 cases
   -uniq phone+email
   -phone taken
   -email taken
   -both taken (with same/different user)
   -what is expected behaviour ?



to-do:
-add bbps txn id in event (done)
-validate in base-plan exist


topics : 
internal.dev.affinity.backenduser.created
internal.dev.affinity.backenduser.creation.request
internal.dev.affinity.crmuser.created
internal.dev.affinity.crmuser.creation.request
internal.dev.affinity.userplan.created



internal.local.affinity.backenduser.created
internal.local.affinity.backenduser.creation.request
internal.local.affinity.crmuser.created
internal.local.affinity.crmuser.creation.request
internal.local.affinity.userplan.created