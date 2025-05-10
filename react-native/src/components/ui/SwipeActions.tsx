import { usePaperTheme } from '@/modules/system-ui/paper-theme';
import Swipeable, { SwipeableMethods } from 'react-native-gesture-handler/ReanimatedSwipeable';
import { Text, TouchableRipple } from 'react-native-paper';
import Animated, { SharedValue, useAnimatedStyle } from 'react-native-reanimated';

type Action = {
  text: string;
  color?: string;
  onPress: () => void;
};

export type SwipeActionsProps = {
  leftActions?: Action[];
  rightActions: Action[];
  actionWidth?: number;

  children: React.ReactNode;
  ref?: React.Ref<SwipeableMethods>;
};

export function SwipeActions({
  children,
  actionWidth = 76,
  leftActions,
  rightActions,
  ref,
}: SwipeActionsProps) {
  return (
    <Swipeable
      ref={ref}
      friction={1}
      leftThreshold={70}
      rightThreshold={70}
      renderLeftActions={(_prog, drag) => {
        return (
          leftActions && (
            <Actions dir="left" items={leftActions} drag={drag} actionWidth={actionWidth} />
          )
        );
      }}
      renderRightActions={(_prog, drag) => {
        return <Actions dir="right" items={rightActions} drag={drag} actionWidth={actionWidth} />;
      }}
    >
      {children}
    </Swipeable>
  );
}

function Actions({
  drag,
  dir,
  items,
  actionWidth = 76,
}: {
  drag: SharedValue<number>;
  dir: 'left' | 'right';
  items: Action[];
  actionWidth?: number;
}) {
  const { paperTheme } = usePaperTheme();
  const len = items.length;

  const styleAni = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: drag.value + (dir === 'left' ? -1 : 1) * actionWidth * len }],
    };
  });

  return (
    <Animated.View style={[styleAni, { flexDirection: 'row', width: actionWidth * len }]}>
      {items.map((i, idx) => {
        return (
          <TouchableRipple
            key={idx}
            onPress={i.onPress}
            className="items-center justify-center flex-1"
            style={{
              width: actionWidth,
              backgroundColor: i.color ?? paperTheme.colors.primaryContainer,
            }}
          >
            <Text style={{ color: '#fff' }}>{i.text}</Text>
          </TouchableRipple>
        );
      })}
    </Animated.View>
  );
}
