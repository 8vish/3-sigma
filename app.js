function updateMetadata() {
    const title = document.title || '';
    const descriptionElement = document.querySelector('meta[name="description"]');
    const description = descriptionElement ? descriptionElement.content : '';

    // Create Open Graph meta tags if they don't exist
    createMetaTag('property', 'og:title', title);
    createMetaTag('property', 'og:description', description);
    createMetaTag('property', 'og:url', window.location.href);
    createMetaTag('property', 'og:type', 'website');

    // Create Twitter Card meta tags if they don't exist
    createMetaTag('name', 'twitter:title', title);
    createMetaTag('name', 'twitter:description', description);
    createMetaTag('name', 'twitter:url', window.location.href);

    // Create SEO meta tags
    createMetaTag('name', 'author', 'Vishal Suryavanshi');
    createMetaTag('name', 'generator', 'EasyCalculator.net');
    createMetaTag('name', 'twitter:creator', '@itsVishSurya');
    createMetaTag('name', 'keywords', 'keyword1, keyword2, keyword3'); // Add your keywords
    createMetaTag('name', 'viewport', 'width=device-width, initial-scale=1.0');
    createMetaTag('name', 'robots', 'index, follow');
    createMetaTag('name', 'revisit-after', '7 days');
    createMetaTag('name', 'rating', 'general');
    createMetaTag('name', 'distribution', 'global');
    createMetaTag('name', 'language', 'en-US');
    createMetaTag('name', 'canonical', window.location.href);
    createMetaTag('name', 'referrer', 'no-referrer-when-downgrade');

    // Create canonical URL and preview image URL based on the current page's URL
    const currentPageSlug = window.location.pathname.split('/').pop().replace('.html', '');
    const canonicalUrl = window.location.href;
    const previewImageUrl = `${window.location.origin}/static/images/preview/${currentPageSlug}.png`;

    // Set canonical URL
    createLinkTag('canonical', canonicalUrl);

    // Set Open Graph and Twitter Card image URLs
    createMetaTag('property', 'og:image', previewImageUrl);
    createMetaTag('name', 'twitter:image', previewImageUrl);
}

function createMetaTag(attribute, property, content) {
    let metaTag = document.querySelector(`meta[${attribute}="${property}"]`);
    if (!metaTag) {
        metaTag = document.createElement('meta');
        metaTag.setAttribute(attribute, property);
        document.head.appendChild(metaTag);
    }
    metaTag.setAttribute('content', content);
}

function createLinkTag(rel, href) {
    let linkTag = document.querySelector(`link[rel="${rel}"]`);
    if (!linkTag) {
        linkTag = document.createElement('link');
        linkTag.rel = rel;
        document.head.appendChild(linkTag);
    }
    linkTag.href = href;
}

document.addEventListener('DOMContentLoaded', updateMetadata);




// Function to toggle the visibility of the distribution chart container
function toggleDistributionChart() {
    var chartContainer = document.getElementById('fullDistributionChartContainer');
    chartContainer.style.display = (chartContainer.style.display === 'none') ? 'block' : 'none';
}

// Function to perform calculations based on user input and display results
function calculateEmpiricalRule() {
    // Retrieve mean and standard deviation inputs
    var meanInput = document.getElementById("mean");
    var stdDevInput = document.getElementById("stdDev");

    // Parse mean and standard deviation values
    var mean = parseFloat(meanInput.value);
    var stdDev = parseFloat(stdDevInput.value);

    // Check if inputs are valid numeric values
    if (isNaN(mean) || isNaN(stdDev)) {
        alert("Please enter valid numeric values for Mean and Standard Deviation.");
        return;
    }

    // Clear existing results
    clearResults();

    // Calculate intervals, display steps, results table, interval chart, and full distribution chart
    var intervals = calculateIntervals(mean, stdDev);
    displaySolveSteps(mean, stdDev);
    displayResultsTable(intervals);
    displayIntervalChart(mean, stdDev, intervals);
    displayFullDistributionChart(mean, stdDev);
}

// Function to clear existing result displays
function clearResults() {
    document.getElementById('solveSteps').innerHTML = '';
    document.getElementById('resultsTable').innerHTML = '';
    document.getElementById('intervalChart').innerHTML = '';
}

// Function to calculate intervals based on mean and standard deviation
function calculateIntervals(mean, stdDev) {
    var interval68 = [mean - stdDev, mean + stdDev];
    var interval95 = [mean - 2 * stdDev, mean + 2 * stdDev];
    var interval997 = [mean - 3 * stdDev, mean + 3 * stdDev];
    return [interval68, interval95, interval997];
}

// Function to toggle the visibility of accordion body
function toggleAccordion(index) {
    var accordionBody = document.getElementById('accordion-collapse-body-' + index);
    accordionBody.classList.toggle('hidden');
}

// Function to display calculation steps dynamically in accordion format
function displaySolveSteps(mean, stdDev) {
    var stepsHtml = '<h2 class="text-2xl mb-4">Calculation Steps</h2>';

    for (var i = 1; i <= 3; i++) {
        stepsHtml += '<div class="mt-4 block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">';
        stepsHtml += '<div id="accordion-collapse-' + i + '" data-accordion="collapse">';
        stepsHtml += '<h2 id="accordion-collapse-heading-' + i + '">';
        stepsHtml += '<button type="button" class="flex items-center justify-between w-full p-5 font-medium rtl:text-right text-gray-500 border border-b-0 border-gray-200 rounded-t-xl focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-800 dark:border-gray-700 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 gap-3" ' +
            'data-accordion-target="#accordion-collapse-body-' + i + '" aria-expanded="' + (i === 1 ? 'true' : 'false') + '" ' +
            'aria-controls="accordion-collapse-body-' + i + '" onclick="toggleAccordion(' + i + ')">';
        stepsHtml += '<span>Part ' + i + ': ' + (i === 1 ? '68% of the data falls within 1 standard deviation of the mean' :
            (i === 2 ? '95% of the data falls within 2 standard deviations of the mean' :
                '99.7% of the data falls within 3 standard deviations of the mean')) + '</span>';
        stepsHtml += '<svg data-accordion-icon class="w-3 h-3 rotate-180 shrink-0" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">';
        stepsHtml += '<path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5 5 1 1 5"/>';
        stepsHtml += '</svg>';
        stepsHtml += '</button>';
        stepsHtml += '</h2>';
        stepsHtml += '<div id="accordion-collapse-body-' + i + '" class="hidden" aria-labelledby="accordion-collapse-heading-' + i + '">';
        stepsHtml += '<div class="p-5 border ' + (i === 3 ? 'border-t-0' : 'border-b-0') + ' border-gray-200 dark:border-gray-700">';
        // Content for each part
        stepsHtml += '<p class="mb-2"><strong>Formulas:</strong></p>';
        stepsHtml += '<p class="mb-2">Lower bound: μ - ' + i + ' × σ</p>';
        stepsHtml += '<p class="mb-2">Upper bound: μ + ' + i + ' × σ</p>';
        stepsHtml += '<p class="mb-2"><strong>Steps:</strong></p>';
        stepsHtml += '<p class="mb-2">Add values to formulas:</p>';
        stepsHtml += '<p class="mb-2">Lower bound: <strong>' + mean + ' - ' + i + ' × ' + stdDev + '</strong></p>';
        stepsHtml += '<p class="mb-2">Upper bound: <strong>' + mean + ' + ' + i + ' × ' + stdDev + '</strong></p>';
        stepsHtml += '<p class="mb-2"><strong>Simplify:</strong></p>';
        stepsHtml += '<p class="mb-2">Lower bound: <strong>' + (mean - i * stdDev) + '</strong></p>';
        stepsHtml += '<p class="mb-2">Upper bound: <strong>' + (mean + i * stdDev) + '</strong></p>';
        stepsHtml += '<p class="mb-2">Calculate:</p>';
        stepsHtml += '<p>Interval: ' + (i * 100) + '% of the data falls within <strong>' + (mean - i * stdDev) + '</strong> to <strong>' + (mean + i * stdDev) + '</strong></p>';
        stepsHtml += '</div>';
        stepsHtml += '</div>';
        stepsHtml += '</div>';
        stepsHtml += '</div>';
    }

    document.getElementById('solveSteps').innerHTML = stepsHtml;
}

// Function to display the results table
function displayResultsTable(intervals) {
    var tableHtml = '<h2 class="text-2xl text-center">Results:</h2><hr>';
    tableHtml += '<div class="relative overflow-x-auto">';
    tableHtml += '<table class="text-center w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">';
    tableHtml += '<thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">';
    tableHtml += '<tr>';
    tableHtml += '<th scope="col" class="px-6 py-3">Interval</th>';
    tableHtml += '<th scope="col" class="px-6 py-3">Min Value</th>';
    tableHtml += '<th scope="col" class="px-6 py-3">Max Value</th>';
    tableHtml += '</tr>';
    tableHtml += '</thead>';
    tableHtml += '<tbody>';

    for (var i = 0; i < intervals.length; i++) {
        var intervalLabel = getIntervalLabel(i);
        var intervalValues = formatInterval(intervals[i]).slice(1, -1).split(',');
        tableHtml += '<tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">';
        tableHtml += `<th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">${intervalLabel}</th>`;
        tableHtml += `<td class="px-6 py-4">${intervalValues[0]}</td>`;
        tableHtml += `<td class="px-6 py-4">${intervalValues[1]}</td>`;
        tableHtml += '</tr>';
    }

    tableHtml += '</tbody>';
    tableHtml += '</table>';
    tableHtml += '</div>';
    tableHtml += '<hr>';
    tableHtml += '<div class="mt-4"></div';

    document.getElementById('resultsTable').innerHTML = tableHtml;
}

// Function to display the interval chart
function displayIntervalChart(mean, stdDev, intervals) {
    var chartData = [];
    intervals.forEach(function (interval, index) {
        var intervalName = getIntervalLabel(index);
        chartData.push({
            name: intervalName,
            data: generateNormalDistributionData(mean, stdDev, interval),
            marker: {
                enabled: false
            },
            fillOpacity: 0.1
        });
    });

    Highcharts.chart('intervalChart', {
        chart: {
            type: 'areaspline'
        },
        title: {
            text: 'Normal Distribution with Intervals'
        },
        xAxis: {
            title: {
                text: 'Value'
            }
        },
        yAxis: {
            title: {
                text: 'Probability Density'
            }
        },
        series: chartData,
        legend: {
            enabled: true
        },
        plotOptions: {
            areaspline: {
                fillOpacity: 0.2,
                lineWidth: 2
            }
        },
        tooltip: {
            formatter: function () {
                return `Interval: ${this.series.name}<br>${getIntervalTooltipText(this.series.name)} Value: ${formatValue(this.x)}<br>Probability : ${formatValue(this.y)}`;
            }
        },
        responsive: {
            rules: [{
                condition: {
                    maxWidth: 500
                },
                chartOptions: {
                    plotOptions: {
                        areaspline: {
                            fillOpacity: 0.1,
                            lineWidth: 1
                        }
                    },
                    yAxis: {
                        title: {
                            text: null
                        }
                    },
                    legend: {
                        enabled: true
                    }
                }
            }]
        }
    });
}

// Function to generate normal distribution data for a given interval
function generateNormalDistributionData(mean, stdDev, interval) {
    var data = [];
    for (var i = interval[0]; i <= interval[1]; i += 0.01) {
        var probability = calculateNormalDistribution(mean, stdDev, i);
        data.push([i, probability]);
    }
    return data;
}

// Function to display the full distribution chart
function displayFullDistributionChart(mean, stdDev) {
    var fullDistributionData = [];
    for (var i = mean - 4 * stdDev; i <= mean + 4 * stdDev; i += 0.01) {
        var probability = calculateNormalDistribution(mean, stdDev, i);
        fullDistributionData.push([i, probability]);
    }

    Highcharts.chart('fullDistributionChart', {
        chart: {
            type: 'spline'
        },
        title: {
            text: 'Full Normal Distribution'
        },
        xAxis: {
            title: {
                text: 'Value'
            }
        },
        yAxis: {
            title: {
                text: 'Probability Density'
            }
        },
        series: [{
            name: 'Normal Distribution',
            data: fullDistributionData,
            marker: {
                enabled: false
            },
            color: 'blue'
        }],
        legend: {
            enabled: false
        },
        plotOptions: {
            spline: {
                lineWidth: 2
            }
        },
        responsive: {
            rules: [{
                condition: {
                    maxWidth: 500
                },
                chartOptions: {
                    plotOptions: {
                        spline: {
                            lineWidth: 1
                        }
                    },
                    yAxis: {
                        title: {
                            text: null
                        }
                    },
                    legend: {
                        enabled: false
                    }
                }
            }]
        }
    });
}

// Function to calculate the probability in normal distribution
function calculateNormalDistribution(mean, stdDev, x) {
    var exponent = -0.5 * Math.pow((x - mean) / stdDev, 2);
    var coefficient = 1 / (stdDev * Math.sqrt(2 * Math.PI));
    return coefficient * Math.exp(exponent);
}

// Function to format interval for display
function formatInterval(interval) {
    return `[${interval[0].toFixed(2)}, ${interval[1].toFixed(2)}]`;
}

// Function to format numerical values for display
function formatValue(value) {
    return value.toFixed(4);
}

// Function to get a math icon for display
function getMathIcon(icon) {
    return `<span class="math-icon">${icon}</span>`;
}

// Function to get the label for an interval
function getIntervalLabel(index) {
    return (index === 0) ? '68%' : (index === 1) ? '95%' : '99.7%';
}

// Function to get tooltip text for an interval
function getIntervalTooltipText(intervalName) {
    switch (intervalName) {
        case '68%':
            return '68% of the data falls within this interval';
        case '95%':
            return '95% of the data falls within this interval';
        case '99.7%':
            return '99.7% of the data falls within this interval';
        default:
            return '';
    }
}

// Function to initialize accordion functionality
function initAccordion() {
    var accordions = document.querySelectorAll('[data-accordion="collapse"]');

    accordions.forEach(function (accordion) {
        var heading = accordion.querySelector('[data-accordion-target]');
        var body = accordion.querySelector('[id^="accordion-collapse-body-"]');

        heading.addEventListener('click', function () {
            var expanded = accordion.getAttribute('aria-expanded') === 'true' || false;

            accordion.setAttribute('aria-expanded', !expanded);
            body.classList.toggle('hidden');
        });
    });
}

document.addEventListener('DOMContentLoaded', function () {
    var themeToggleDarkIcon = document.getElementById('theme-toggle-dark-icon');
    var themeToggleLightIcon = document.getElementById('theme-toggle-light-icon');
    var themeToggleBtn = document.getElementById('theme-toggle');
    var body = document.body;

    // Set initial state based on user preference or default to light theme
    if (localStorage.getItem('color-theme') === 'dark' || (!('color-theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
        themeToggleLightIcon.classList.add('hidden');
        themeToggleDarkIcon.classList.remove('hidden');
        body.classList.add('dark');
    } else {
        themeToggleDarkIcon.classList.add('hidden');
        themeToggleLightIcon.classList.remove('hidden');
    }

    themeToggleBtn.addEventListener('click', function () {
        // Toggle icons inside button
        themeToggleDarkIcon.classList.toggle('hidden');
        themeToggleLightIcon.classList.toggle('hidden');

        // Toggle dark mode
        body.classList.toggle('dark');

        // Update user preference in localStorage
        if (body.classList.contains('dark')) {
            localStorage.setItem('color-theme', 'dark');
        } else {
            localStorage.removeItem('color-theme');
        }
    });
});




// Call the initAccordion function when the DOM is ready
document.addEventListener('DOMContentLoaded', function () {
    initAccordion();
});


// Automatically trigger the button click when the page is loaded
document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("calculateBtn").click();
});
