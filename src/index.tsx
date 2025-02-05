import { useImperativeHandle, forwardRef, useCallback, useMemo } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
  useAnimatedReaction,
  runOnJS,
} from 'react-native-reanimated';
import { iconUrls } from './constants';

export type Reaction = {
  id: string;
  iconUrl: string;
};

type ReactionBarProps = {
  onDismiss: () => void;
  onReactionSelect: (reaction: Reaction) => void; // Callback for selected reaction
};

export type ReactionBarRef = {
  showReactions: () => void;
  dismissReactions: () => void;
};

const ReactionBar = forwardRef<ReactionBarRef, ReactionBarProps>(
  ({ onDismiss, onReactionSelect }, ref) => {
    // Reanimated shared values for animations
    const scale = useSharedValue(0);
    const bounce = useSharedValue(1);

    const reactions = useMemo<Reaction[]>(
      () => [
        { id: 'like', iconUrl: iconUrls[0]! },
        { id: 'love', iconUrl: iconUrls[1]! },
        { id: 'haha', iconUrl: iconUrls[2]! },
        { id: 'wow', iconUrl: iconUrls[3]! },
        { id: 'sad', iconUrl: iconUrls[4]! },
        { id: 'angry', iconUrl: iconUrls[5]! },
      ],
      []
    );

    // Animated styles
    const reactionBarStyle = useAnimatedStyle(() => ({
      transform: [{ scale: scale.value }],
      opacity: scale.value,
    }));

    const bounceStyle = useAnimatedStyle(() => ({
      transform: [{ scale: bounce.value }],
    }));

    // Show reactions
    const showReactions = useCallback(() => {
      scale.value = withSpring(1, { damping: 10, stiffness: 100 });
    }, [scale]);

    // Dismiss reactions
    const dismissReactions = useCallback(() => {
      scale.value = withTiming(0, { duration: 200 });
    }, [scale]);

    // Handle reaction selection
    const handleReactionSelect = useCallback(
      (id: string) => {
        const selectedReaction = reactions.find(
          (reaction) => reaction.id === id
        );
        if (selectedReaction) {
          onReactionSelect(selectedReaction);
        }

        // Trigger bounce effect
        bounce.value = 1.5;
        bounce.value = withSpring(1, { damping: 5, stiffness: 150 });

        dismissReactions();
      },
      [bounce, dismissReactions, onReactionSelect, reactions]
    );

    useAnimatedReaction(
      () => scale.value === 0,
      (isDismissed) => {
        if (isDismissed) {
          runOnJS(onDismiss)();
        }
      }
    );

    // Expose methods to parent component
    useImperativeHandle(ref, () => ({
      showReactions,
      dismissReactions,
    }));

    return (
      <Animated.View style={[styles.reactionBar, reactionBarStyle]}>
        {reactions.map((reaction) => (
          <TouchableOpacity
            key={reaction.id}
            onPress={() => handleReactionSelect(reaction.id)}
            style={styles.reactionIconWrapper}
          >
            <Animated.Image
              source={{ uri: reaction.iconUrl }}
              style={[styles.reactionIcon, bounceStyle]}
            />
          </TouchableOpacity>
        ))}
      </Animated.View>
    );
  }
);

const styles = StyleSheet.create({
  reactionBar: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 30,
    padding: 10,
    alignSelf: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  reactionIconWrapper: {
    marginHorizontal: 9,
  },
  reactionIcon: {
    width: 32,
    height: 32,
  },
});

export default ReactionBar;
