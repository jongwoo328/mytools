// Count braces and brackets to detect imbalance
function countBraces(text: string): { open: number; close: number; openBracket: number; closeBracket: number } {
  let open = 0,
    close = 0,
    openBracket = 0,
    closeBracket = 0;
  let inString = false;
  let escape = false;

  for (const char of text) {
    if (escape) {
      escape = false;
      continue;
    }
    if (char === "\\") {
      escape = true;
      continue;
    }
    if (char === '"') {
      inString = !inString;
      continue;
    }
    if (!inString) {
      if (char === "{") open++;
      else if (char === "}") close++;
      else if (char === "[") openBracket++;
      else if (char === "]") closeBracket++;
    }
  }

  return { open, close, openBracket, closeBracket };
}

// Try to repair imbalanced braces
function repairJson(input: string): string {
  let trimmed = input.trim();

  // Remove trailing commas before } or ]
  trimmed = trimmed.replace(/,\s*}/g, "}").replace(/,\s*]/g, "]");

  const counts = countBraces(trimmed);

  // Add missing closing braces
  const missingClose = counts.open - counts.close;
  const missingCloseBracket = counts.openBracket - counts.closeBracket;

  if (missingClose > 0) {
    trimmed += "}".repeat(missingClose);
  }
  if (missingCloseBracket > 0) {
    trimmed += "]".repeat(missingCloseBracket);
  }

  // Add missing opening braces (wrap if needed)
  if (missingClose < 0) {
    trimmed = "{".repeat(-missingClose) + trimmed;
  }
  if (missingCloseBracket < 0) {
    trimmed = "[".repeat(-missingCloseBracket) + trimmed;
  }

  return trimmed;
}

export class InvalidJsonError extends Error {
  constructor(message?: string) {
    super(message);
    this.name = "InvalidJsonError";
  }
}
// Try multiple JSON parsing strategies
export function parseJsonFlexible(input: string): unknown {
  const trimmed = input.trim();

  // Strategy 1: Direct parse
  try {
    return JSON.parse(trimmed);
  } catch {
    // Continue to next strategy
  }

  // Strategy 2: Wrap with braces if starts with key
  if (trimmed.startsWith('"')) {
    try {
      return JSON.parse(`{${trimmed}}`);
    } catch {
      // Continue
    }
  }

  // Strategy 3: Repair imbalanced braces and parse
  try {
    const repaired = repairJson(trimmed);
    return JSON.parse(repaired);
  } catch {
    // Continue
  }

  // Strategy 4: Wrap with braces and repair
  if (trimmed.startsWith('"')) {
    try {
      const wrapped = `{${trimmed}}`;
      const repaired = repairJson(wrapped);
      return JSON.parse(repaired);
    } catch {
      // Continue
    }
  }

  // Strategy 5: Wrap non-object content
  const keyMatch = trimmed.match(/^"(\w+)":\s*\{/);
  if (keyMatch) {
    try {
      const wrapped = `{${trimmed}}`;
      const repaired = repairJson(wrapped);
      return JSON.parse(repaired);
    } catch {
      // Continue
    }
  }

  throw new InvalidJsonError();
}
