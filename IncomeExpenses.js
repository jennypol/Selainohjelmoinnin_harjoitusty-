import React from "react";

export const IncomeExpenses = () => {
    return (
       <div class="inc-exp-container">
        <div>
                <h4>kilometrit</h4>
                <p id="kilometrimaara" class="kilometrit">+0.00km</p>
            </div>
            <div>
                <h4>Kulut</h4>
                <p id="kulut" class="kulut">0.00€</p>
            </div>
            <div>
                <h4>litrat</h4>
                <p id="litrat" class="litrat">0.00l</p>
            </div>
       </div>
    )
}