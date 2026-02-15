// Assuming the existing structure looks something like this:
const providers = [
    'provider1',
    'provider2',
    // Add deepseek to the list
    'deepseek'
];

function listModels() {
    providers.forEach(provider => {
        // Logic to list models for each provider
        console.log(`Models for ${provider}: ...`);
    });
}

// Call the function to list models
listModels();