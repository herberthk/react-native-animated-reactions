# react-native-animated-reactions

Facebook inspired animated reactions component

## Installation

```sh
npm install @herberthtk/react-native-animated-reactions
```
## Demo
![Animated reactions](./reactions.gif)

## Usage


```js
import { useRef, useState } from 'react';
import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import ReactionBar, {
  type ReactionBarRef,
  type Reaction,
} from '@herberthtk/react-native-animated-reactions';

const App = () => {
  const reactionBarRef = useRef<ReactionBarRef>(null);
  const [selectedReaction, setSelectedReaction] = useState<Reaction | null>(
    null
  );
  const handleReactionSelect = (reaction: Reaction) => {
    console.log('Selected Reaction:', reaction);
    setSelectedReaction(reaction);
  };

  const onDismiss = () => {
    console.log('Reaction bar dismissed');
  };

  const showReaction = () => {
    reactionBarRef.current?.showReactions();
  };

  const dismissReaction = () => {
    reactionBarRef.current?.dismissReactions();
  };

  return (
    <Pressable style={styles.container} onPress={dismissReaction}>
      {selectedReaction && (
        <View style={styles.selectedItem}>
          <Text style={styles.selectedReactionText}>
            Selected Reaction: {selectedReaction.id}
          </Text>
          <Image
            source={{ uri: selectedReaction.iconUrl }}
            style={styles.selectedIcon}
          />
        </View>
      )}

      <TouchableOpacity onPress={showReaction} style={styles.triggerButton}>
        <Text style={styles.triggerButtonText}>Show Reactions</Text>
      </TouchableOpacity>

      {/* Overlay and positioning are handled here */}

      <ReactionBar
        ref={reactionBarRef}
        onReactionSelect={handleReactionSelect}
        onDismiss={onDismiss}
      />
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  triggerButton: {
    padding: 10,
    backgroundColor: '#007BFF',
    borderRadius: 5,
  },
  triggerButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  selectedReactionText: {
    fontSize: 16,
    color: '#333',
  },
  selectedItem: {
    marginBottom: 20,
    flexDirection: 'row',
    gap: 30,
  },
  selectedIcon: {
    width: 32,
    height: 32,
  },
});

export default App;

```


## Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

#### Support
If you find this package useful, please give it a star ⭐ on github to support my efforts, I work on this project in my free time

## License

MIT

---

Made with :heart: by [Herbert kavuma](https://herbert.netbritz.com/)
