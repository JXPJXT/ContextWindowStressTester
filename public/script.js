document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('test-form');
    const runBtn = document.getElementById('run-btn');
    const btnText = runBtn.querySelector('.btn-text');
    const spinner = document.getElementById('loading-spinner');
    const resultsSection = document.getElementById('results-section');
    const resultsGrid = document.getElementById('results-grid');
    const template = document.getElementById('result-card-template');

    const caseNames = {
        case1: "Case 1: Clean Prompt",
        case2: "Case 2: Irrelevant Noise",
        case3: "Case 3: Conflicting Info",
        case4: "Case 4: Large Duplicate Context"
    };

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const basePrompt = document.getElementById('base-prompt').value;
        const question = document.getElementById('question').value;
        const extraContext = document.getElementById('extra-context').value;

        // UI State Update
        runBtn.disabled = true;
        btnText.textContent = "Testing...";
        spinner.classList.remove('hidden');
        resultsSection.classList.add('hidden');
        document.querySelector('.container').classList.remove('expanded');
        resultsGrid.innerHTML = ''; // Clear old results

        try {
            const response = await fetch('/api/test', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ basePrompt, question, extraContext })
            });

            if (!response.ok) {
                throw new Error("Server responded with an error");
            }

            const data = await response.json();
            
            // Render results
            ['case1', 'case2', 'case3', 'case4'].forEach(caseKey => {
                const result = data[caseKey];
                if (result) {
                    const card = createResultCard(caseNames[caseKey], result);
                    resultsGrid.appendChild(card);
                }
            });

            resultsSection.classList.remove('hidden');
            document.querySelector('.container').classList.add('expanded');
            
            // Scroll to results smoothly (only on smaller screens where it doesn't fit side by side)
            if (window.innerWidth < 1024) {
                resultsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }

        } catch (error) {
            console.error("Test failed:", error);
            alert("An error occurred while running the tests. Check console for details.");
        } finally {
            // Restore UI State
            runBtn.disabled = false;
            btnText.textContent = "Run Stress Test";
            spinner.classList.add('hidden');
        }
    });

    function createResultCard(title, resultData) {
        const clone = template.content.cloneNode(true);
        
        clone.querySelector('.case-title').textContent = title;
        
        const badge = clone.querySelector('.hallucination-badge');
        if (resultData.hallucination) {
            badge.textContent = "Hallucination Detected";
            badge.classList.add('danger');
        } else {
            badge.textContent = "Clean Output";
            badge.classList.add('safe');
        }

        clone.querySelector('.time-val').textContent = `${resultData.timeTaken}ms`;
        clone.querySelector('.token-val').textContent = `${resultData.promptTokens || 0} / ${resultData.completionTokens || 0}`;
        clone.querySelector('.tps-val').textContent = resultData.tps || 0;
        clone.querySelector('.noise-val').textContent = `${resultData.noiseRatio || 0}%`;
        clone.querySelector('.model-val').textContent = resultData.modelUsed || "N/A";
        clone.querySelector('.answer-text').textContent = resultData.answer;

        return clone;
    }
});
