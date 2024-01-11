/*
 * Copyright (c) 2024 EasyCalculator.net
 *
 * This code is copyrighted and the exclusive property of EasyCalculator.net.
 * Unauthorized use or reproduction is strictly prohibited.
 * Use without express permission or payment is illegal and may result in legal action.
 *
 * Permission is not granted to copy, distribute, modify, or use this file in any manner
 * without express written permission from EasyCalculator.net.
 *
 * For inquiries or permission requests, please contact EasyCalculator.net at contact@easycalculator.net.
 *
 * All rights reserved.
 */









// Function to load and inject HTML content into an element
function loadHTML(url, elementId) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.onload = function () {
        if (xhr.status === 200) {
            document.getElementById(elementId).innerHTML = xhr.responseText;
        }
    };
    xhr.send();
}

// Load header content
loadHTML('/static/html/header.html', 'header');

// Load footer content
loadHTML('/static/html/footer.html', 'footer');





// this code generate all seo meta tags just need meta title and description and this code can generate all seo tags and preview image url is domain/static/images/preview/{slug}.png

function updateMetadata() {
    const title = document.title || '';
    const descriptionElement = document.querySelector('meta[name="description"]');
    const description = descriptionElement ? descriptionElement.content : '';
    
    // Create Favicon Link
    createFaviconLink('/favicon.ico');
    
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

