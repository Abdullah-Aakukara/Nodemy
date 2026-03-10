const showTransactionsForm = document.getElementById('admin-dashboard-transactions-list')
const showTransactions = document.getElementById('show-transactions');
const transactionsList = document.getElementById('transactions');

const jwtToken = localStorage.getItem('JWT-token');

const handleClick = async (event) => {
    event.preventDefault();

    try {
        const response = await fetch('/admin/transactions', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${jwtToken}`
            }
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || 'Failed to fetch transactions');
        }

        const {transactions} = await response.json();

        // Clear existing list
        transactionsList.innerHTML = '';

        // Display each transaction
        if (transactions.length === 0) {
            const li = document.createElement('li');
            li.textContent = 'No transactions found.';
            transactionsList.appendChild(li);
        } else {
            transactions.forEach(transaction => {
                const li = document.createElement('li');
                li.textContent = `Transaction ID: ${transaction.transaction_id}, Paid by (Student ID): ${transaction.user_id}, Amount: ${transaction.amount}, Status: ${transaction.status}`; 
                transactionsList.appendChild(li);
            });
        }

        console.log(transactions);
    } catch (error) {
        console.error(error);
        window.alert(error.message || 'An error occurred');
    }
};

showTransactionsForm.addEventListener('submit', handleClick);