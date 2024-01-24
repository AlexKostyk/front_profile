let curr_menu_pont = 3;

let currPlan = {plan_name: "Pay as you go", payment: 3, term: "contract", plan_info: ["Access to main tools", "Customer Support", ".txt and .doc files", "Complete document archive"]};

let upgradePlan = [
    {plan_name: "Light Subscription", payment: 30, term: "month", plan_info: ["Access to main tools", "Customer Support", ".txt and .doc files", "Complete document archive", "4 contracts per day"]},
    {plan_name: "Pro Subscription", payment: 75, term: "month", plan_info: ["Access to main tools", "Customer Support", ".txt and .doc files", "Complete document archive", "Unlimited requests and doc size"]}
];

document.addEventListener('DOMContentLoaded', function() {
    getPlansData();
});

function getPlansData() {
    // получение и присвоение даты

    updateCurrPlan();
    updateUpgradePlan();
}

function updateCurrPlan() {
    let current_plan_name = document.getElementById("current-plan-name");
    let current_payment = document.getElementById("current-payment");
    let current_term = document.getElementById("current-term");
    let current_plan_ul = document.getElementById("current-plan-ul");

    current_plan_name.innerText = currPlan.plan_name;
    current_payment.innerText = currPlan.payment + "$";
    current_term.innerText = "/" + currPlan.term;

    currPlan.plan_info.forEach(item => {
        let liElement = document.createElement("li");
        
        liElement.textContent = item;
        
        current_plan_ul.appendChild(liElement);
    });
}

function updateUpgradePlan() {
    let upgrade_plan_name = document.getElementsByClassName("upgrade-plan-name");
    let upgrade_payment = document.getElementsByClassName("upgrade-payment");
    let upgrade_term = document.getElementsByClassName("upgrade-term");
    let upgrade_plan_ul = document.getElementsByClassName("upgrade-plan-ul");

    for (let i = 0; i <= 1; i++) {
        upgrade_plan_name[i].innerText = upgradePlan[i].plan_name;
        upgrade_payment[i].innerText = upgradePlan[i].payment + "$";
        upgrade_term[i].innerText = "/" + upgradePlan[i].term;

        upgradePlan[i].plan_info.forEach(item => {
            let liElement = document.createElement("li");
            
            liElement.textContent = item;
            
            upgrade_plan_ul[i].appendChild(liElement);
        });
    }
}