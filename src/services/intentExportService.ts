
import { Intent } from "@/types/intent";

export interface ExportIntent {
  displayName: string;
  description: string;
  trainingPhrases: Array<{
    text: string;
    entities: Array<{
      entityType: string;
      value: string;
      startIndex: number;
      endIndex: number;
    }>;
  }>;
  language: string;
  category: string;
}

export const exportIntentAsJSON = (intent: Intent): void => {
  const exportData: ExportIntent = {
    displayName: intent.displayName,
    description: intent.description,
    trainingPhrases: intent.trainingPhrases.map(phrase => ({
      text: phrase.text,
      entities: phrase.entities.map(entity => ({
        entityType: entity.entityType,
        value: entity.value,
        startIndex: entity.startIndex,
        endIndex: entity.endIndex
      }))
    })),
    language: intent.language || 'en',
    category: intent.category || ''
  };

  const blob = new Blob([JSON.stringify(exportData, null, 2)], { 
    type: 'application/json' 
  });
  
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `${intent.displayName.replace(/[^a-z0-9]/gi, '_').toLowerCase()}.json`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
};

export const exportIntentAsCSV = (intent: Intent): void => {
  const headers = ['Training Phrase', 'Entity Type', 'Entity Value', 'Start Index', 'End Index'];
  const rows: string[][] = [];

  intent.trainingPhrases.forEach(phrase => {
    if (phrase.entities.length === 0) {
      // If no entities, add the phrase with empty entity fields
      rows.push([phrase.text, '', '', '', '']);
    } else {
      // Add a row for each entity in the phrase
      phrase.entities.forEach(entity => {
        rows.push([
          phrase.text,
          entity.entityType,
          entity.value,
          entity.startIndex.toString(),
          entity.endIndex.toString()
        ]);
      });
    }
  });

  // Convert to CSV format
  const csvContent = [
    headers.join(','),
    ...rows.map(row => 
      row.map(cell => `"${cell.replace(/"/g, '""')}"`).join(',')
    )
  ].join('\n');

  const blob = new Blob([csvContent], { type: 'text/csv' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `${intent.displayName.replace(/[^a-z0-9]/gi, '_').toLowerCase()}.csv`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
};

export const exportMultipleIntentsAsJSON = (intents: Intent[]): void => {
  const exportData = intents.map(intent => ({
    displayName: intent.displayName,
    description: intent.description,
    trainingPhrases: intent.trainingPhrases.map(phrase => ({
      text: phrase.text,
      entities: phrase.entities.map(entity => ({
        entityType: entity.entityType,
        value: entity.value,
        startIndex: entity.startIndex,
        endIndex: entity.endIndex
      }))
    })),
    language: intent.language || 'en',
    category: intent.category || ''
  }));

  const blob = new Blob([JSON.stringify(exportData, null, 2)], { 
    type: 'application/json' 
  });
  
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `intents_export_${new Date().toISOString().split('T')[0]}.json`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
};
