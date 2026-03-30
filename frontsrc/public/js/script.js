// 1. Your Data Source (could come from an API later)
const examData = [
    { title: "TRE 1.0 (BPSC)", link: "/tre_1.pdf" },
    { title: "TRE 2.0 (BPSC)", link: "/tre_2.pdf" },
    { title: "TRE 3.0 (BPSC)", link: "/tre_3.pdf" }
];

// 2. Select the table body
const tableBody = document.getElementById('exam-table-body');

// 3. Function to render the rows
function renderTable(data) {const examData = [
    { title: "TRE 1.0 (BPSC)", link: "/tre_1.pdf" },
    { title: "TRE 2.0 (BPSC)", link: "/tre_2.pdf" },
    { title: "TRE 3.0 (BPSC)", link: "/tre_3.pdf" }
];

function renderTable(data) {
    const tableBody = document.getElementById('exam-table-body');
    if (!tableBody) return; // Safety check

    tableBody.innerHTML = ""; 

    data.forEach(item => {
        const row = `
            <tr>
                <td style="font-size: 0.9rem; vertical-align: middle;">${item.title}</td>
                <td class="text-end">
                    <a href="${item.link}" class="btn btn-sm btn-outline-primary" download>
                        Download
                    </a>
                    <a href="${item.link}" class="btn btn-sm btn-outline-primary" download>
                      Solution                        
                    </a>
                </td>
            </tr>
        `;
        tableBody.insertAdjacentHTML('beforeend', row);
    });
}

// Run when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
    renderTable(examData);
});
    console.log("ssssss");
    // Clear existing content to prevent duplicates
    tableBody.innerHTML = "";

    data.forEach(item => {
        // Create the row structure
        const row = `
            <tr>
                <td>${item.title}</td>
                <td>
                    <a href="${item.link}" class="btn-outline-primary" download>
                        Download
                    </a>
                </td>
            </tr>
        `;
        // Append it to the table
        tableBody.innerHTML += row;
    });
}

// 4. Run the function
renderTable(examData);

// 1. Mock Data with ISO Dates (YYYY-MM-DD)
const mockData = [
    { date: "2026-05-20", title: "Mock 1.0", link: "/paper1.pdf", sol: "/sol1.pdf" },
    { date: "2026-05-21", title: "Mock 2.0", link: "/paper2.pdf", sol: "/sol2.pdf" },
    { date: "2026-05-22", title: "Mock 3.0", link: "/paper3.pdf", sol: "/sol3.pdf" }
];

function renderMockTable(data) {
    const mockBody = document.getElementById('mock-table-body');
    if (!mockBody) return;

    mockBody.innerHTML = "";

    const now = new Date();

    data.forEach(item => {
        const releaseDate = new Date(item.date);
        // Calculate difference in milliseconds
        const diffInMs = now - releaseDate;
        const twentyFourHoursInMs = 24 * 60 * 60 * 1000;

        // Determine if solution should be visible
        const isSolutionReady = diffInMs >= twentyFourHoursInMs;

        const row = `
            <tr>
                <td class="small text-muted">${item.date}</td>
                <td><a href="${item.link}" class="text-decoration-none">PDF</a></td>
                <td>
                    ${isSolutionReady 
                        ? `<a href="${item.sol}" class="badge bg-success text-decoration-none">View Sol</a>` 
                        : `<span class="badge bg-light text-dark border">Waiting...</span>`
                    }
                </td>
            </tr>
        `;
        mockBody.insertAdjacentHTML('beforeend', row);
    });
}

// Update your DOMContentLoaded listener to run both functions
document.addEventListener('DOMContentLoaded', () => {
    renderTable(examData); // Your existing function
    renderMockTable(mockData); // The new function
});