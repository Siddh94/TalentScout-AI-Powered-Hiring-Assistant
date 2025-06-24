export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export function isValidPhone(phone: string): boolean {
  // Basic phone validation - accepts various formats
  const phoneRegex = /^[\+]?[\d\s\-\(\)]{10,}$/;
  return phoneRegex.test(phone.replace(/\s/g, ''));
}

export function isValidName(name: string): boolean {
  return name.trim().length >= 2 && /^[a-zA-Z\s]+$/.test(name.trim());
}

export function isValidExperience(experience: string): boolean {
  const exp = parseFloat(experience);
  return !isNaN(exp) && exp >= 0 && exp <= 50;
}

export function sanitizeInput(input: string): string {
  return input.trim().replace(/[<>]/g, '');
}

export function parseTechStack(input: string): string[] {
  return input
    .split(/[,\n]/)
    .map(tech => sanitizeInput(tech))
    .filter(tech => tech.length > 0)
    .slice(0, 15); // Limit to 15 technologies
}